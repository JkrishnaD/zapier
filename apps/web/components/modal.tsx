import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { EmailSelector } from "./email-selector";
import { SolanaSelector } from "./solana-selector";

interface ModalProps {
  isOpen: boolean;
  index: number;
  onSelect: (
    props: null | { name: string; id: string; image: string; metadata: any }
  ) => void;
  availableItems: {
    id: string;
    name: string;
    image: string;
  }[];
}

export const Modal = ({
  index,
  isOpen,
  onSelect,
  availableItems,
}: ModalProps) => {
  const [step, setStep] = useState(0);
  const [selectedAction, setSelectedAction] = useState<{
    id: string;
    name: string;
    image: string;
  }>();
  const isTrigger = index === 1;

  return (
    <Dialog open={isOpen} onOpenChange={() => onSelect(null)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex items-center">
          <DialogTitle>Select {isTrigger ? "Trigger" : "Action"}</DialogTitle>
        </DialogHeader>
        <Separator orientation="horizontal" />

        {step === 1 && selectedAction?.id === "email" && (
          <EmailSelector
            setMetadata={(metadata) => {
              onSelect({
                ...selectedAction,
                metadata,
              });
              onSelect(null);
            }}
          />
        )}
        {step === 1 && selectedAction?.id === "send-sol" && (
          <SolanaSelector
            setMetadata={(metadata) => {
              onSelect({
                ...selectedAction,
                metadata,
              });
              onSelect(null);
            }}
          />
        )}
        {step === 0 &&
          availableItems.map(({ id, name, image }, index) => (
            <div
              key={index}
              className="flex space-x-2 border p-3 rounded-xl cursor-pointer hover:bg-gray-50"
              onClick={() => {
                onSelect({
                  id,
                  name,
                  image,
                  metadata: {},
                });
                if (!isTrigger) {
                  setStep(1);
                  setSelectedAction({ id, name, image });
                } else {
                  onSelect(null);
                }
              }}
            >
              <Image src={image} alt="" width={25} height={15} />
              <p className="font-semibold text-base">{name}</p>
            </div>
          ))}
      </DialogContent>
    </Dialog>
  );
};
