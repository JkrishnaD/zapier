import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();
const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRun = await client.zapOutbox.findMany({
      where: {},
      take: 10,
    });
    // pendingRun is an Array of zap's which are active
    console.log(pendingRun);
    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRun.map((r) => ({
        value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 }),
      })),
    });

    //after sending the zap from outbox to kafka queue we delete them from the outbox table
    await client.zapOutbox.deleteMany({
      where: {
        id: {
          in: pendingRun.map((r) => r.id),
        },
      },
    });

    await new Promise((r) => setTimeout(r, 5000));
  }
}

main();
