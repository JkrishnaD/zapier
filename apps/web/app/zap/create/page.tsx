"use client";
import { Appbar } from "@/components/appbar";
import { Button } from "@/components/ui/button";
import { ZapCell } from "@/components/zap-cell";
import { Plus } from "lucide-react";
import { useState } from "react";

const CreatePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedAction, setSelectedAction] = useState<
    {
      availableActionId: string;
      availableActionName: string;
    }[]
  >([]);

  return (
    <div>
      <Appbar />
      <div className="bg-gray-100 min-h-[90vh] w-full flex justify-center items-center flex-col">
        <div>
          <ZapCell
            name={selectedTrigger ? selectedTrigger : "Trigger"}
            index={1}
          />
        </div>
        <div>
          {selectedAction.map((action, index) => (
            <ZapCell
              key={index}
              name={action ? action.availableActionName : "Action"}
              index={2 + index}
            />
          ))}
        </div>
        <Button
        className="rounded-full p-3"
        variant="outline"
          onClick={() => {
            setSelectedAction((a) => [
              ...a,
              {
                availableActionId: "",
                availableActionName: "Action",
              },
            ]);
          }}
        >
          <Plus/>
        </Button>
      </div>
    </div>
  );
};
export default CreatePage;
