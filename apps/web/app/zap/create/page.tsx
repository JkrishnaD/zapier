"use client";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ZapCell } from "@/components/zap-cell";
import { BACKEND_URL } from "@/config";
import { useGetTriggersActions } from "@/hooks/use-get-triggers-actions";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CreatePage = () => {
  const router = useRouter();
  const [zapName, setZapName] = useState("Untitled Zap");
  const [selectedTrigger, setSelectedTrigger] = useState<{
    availableTriggerId: string;
    availableTriggerName: string;
    availableTriggerImage: string;
  }>();
  const [selectedActions, setSelectedActions] = useState<
    {
      index: number;
      availableActionId: string;
      availableActionName: string;
      availableActionImage: string;
      metadata: any;
    }[]
  >([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(
    null
  );
  const { availableTriggers, availableActions } = useGetTriggersActions();

  const handlePublish = async () => {
    try {
      if (!selectedTrigger?.availableTriggerId) {
        return;
      }
      await axios.post(
        `${BACKEND_URL}/api/v1/zap`,
        {
          name: zapName,
          availableTriggerId: selectedTrigger.availableTriggerId,
          tirggerMetadata: {},
          actions: selectedActions.map((x) => ({
            availableActionId: x.availableActionId,
            actionMetadata: x.metadata,
          })),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      toast.success("zap created");
      router.push("/dashboard");
    } catch (error) {
      toast.error("zap creation failed");
    }
  };
  return (
    <div className="bg-gray-100 h-screen overflow-y-auto w-full pt-10 ">
      <div className="flex justify-between p-4 mb-2">
        <Button onClick={() => router.push("/dashboard")}>Go Back</Button>
        <span className="flex items-center justify-center w-fit space-x-1 font-semibold">
          <span>Zap</span>
          <span>Title:</span>
          <Input
            onChange={(e) => setZapName(e.target.value)}
            placeholder="Title"
            className="py-4 w-[400px]"
          />
        </span>
        <Button
          onClick={handlePublish}
          variant={"outline"}
          className="bg-[#00a5ff] hover:bg-[#00a5ff]/75 text-white font-semibold"
        >
          Publish
        </Button>
      </div>
      <div className="flex justify-center items-center flex-col">
        <div className="flex overflow-y-hidden">
          <ZapCell
            onClick={() => {
              setSelectedModalIndex(1);
            }}
            name={
              selectedTrigger ? selectedTrigger.availableTriggerName : "Trigger"
            }
            index={1}
            image={selectedTrigger?.availableTriggerImage}
          />
        </div>
        <div>
          {selectedActions.map((action, index) => (
            <ZapCell
              onClick={() => setSelectedModalIndex(action.index)}
              key={index}
              name={action ? action.availableActionName : "Action"}
              index={action.index}
              image={action.availableActionImage}
            />
          ))}
        </div>
        <Button
          className="rounded-full p-3"
          variant="outline"
          onClick={() => {
            setSelectedActions((a) => [
              ...a,
              {
                index: a.length + 2,
                availableActionId: "",
                availableActionName: "Action",
                availableActionImage: "",
                metadata: {},
              },
            ]);
          }}
        >
          <Plus />
        </Button>
        <div className="bg-gray-100">
          {selectedModalIndex !== null && (
            <Modal
              isOpen={true}
              index={selectedModalIndex}
              onSelect={(
                props: null | {
                  name: string;
                  id: string;
                  image: string;
                  metadata: any;
                }
              ) => {
                if (props === null) {
                  setSelectedModalIndex(null);
                  return;
                }

                if (selectedModalIndex === 1) {
                  setSelectedTrigger({
                    availableTriggerId: props.id,
                    availableTriggerName: props.name,
                    availableTriggerImage: props.image,
                  });
                } else {
                  setSelectedActions((a) => {
                    const newAction = [...a];
                    newAction[selectedModalIndex - 2] = {
                      index: selectedModalIndex,
                      availableActionId: props.id,
                      availableActionName: props.name,
                      availableActionImage: props.image,
                      metadata: props.metadata,
                    };
                    return newAction;
                  });
                }
              }}
              availableItems={
                selectedModalIndex === 1 ? availableTriggers : availableActions
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default CreatePage;
