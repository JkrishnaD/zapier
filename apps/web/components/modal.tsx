import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "@/components/ui/separator";
interface ModalProps {
  isOpen: boolean;
  index: number;
  onSelect: (props: null | { name: string; id: string; image: string }) => void;
  availableItems: {
    id: string;
    name: string;
    image: string;
  }[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Modal = ({
  index,
  isOpen,
  onSelect,
  availableItems,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onSelect(null)}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex items-center">
          <DialogTitle>Select {index === 1 ? "Trigger" : "Action"}</DialogTitle>
        </DialogHeader>
        <Separator orientation="horizontal" />
        {availableItems.map((x, index) => (
          <div
            key={index}
            className="flex space-x-2 border p-3 rounded-xl cursor-pointer hover:bg-gray-50"
            onClick={() => {
              onSelect({
                id: x.id,
                name: x.name,
                image: x.image,
              });
              onSelect(null)
            }}
          >
            <Image src={x.image} alt="" width={25} height={15} />
            <p className="font-semibold text-base">{x.name}</p>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
