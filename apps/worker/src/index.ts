require('dotenv').config()
import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { parse } from "./parse";
import { sendEmails } from "./mail";
import { sendSolana } from "./send-sol";

const TOPIC_NAME = "zap-events";
const client = new PrismaClient();
const kafka = new Kafka({
  clientId: "zap-events",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();

  consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      if (!message.value?.toString()) {
        return;
      }
      const parsedData = JSON.parse(message.value?.toString());
      const zapRunId = parsedData.zapRunId;
      const stage = parsedData.stage;

      const zapRunDetails = await client.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currentAction = zapRunDetails?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );

      if (!currentAction) {
        console.log("current action not found");
        return;
      }
      const zapRunMetadata = zapRunDetails?.metadata;

      if (currentAction.type.id === "email") {
        console.log("sending the email");
        const body = parse(
          (currentAction.metadata as JsonObject)?.body as string,
          zapRunMetadata
        );
        const email = parse(
          (currentAction.metadata as JsonObject)?.email as string,
          zapRunMetadata
        );
        console.log(`Sending Email ${email} with the message ${body}`);
        await sendEmails(email, body);
      }

      if (currentAction.type.id === "send-sol") {
        const address = parse(
          (currentAction.metadata as JsonObject)?.address as string,
          zapRunMetadata
        );
        const amount = parse(
          (currentAction.metadata as JsonObject)?.amount as string,
          zapRunMetadata
        );
        console.log(`Sending ${amount}sol for ${address}`);
        await sendSolana(address,amount)
      }
      //stop the program for 5 second
      await new Promise((r) => setTimeout(r, 5000));

      const lastStage = (zapRunDetails?.zap.actions.length || 1) - 1;

      if (lastStage !== stage) {
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                zapRunId,
              }),
            },
          ],
        });
      }

      console.log("process done");

      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}

main();
