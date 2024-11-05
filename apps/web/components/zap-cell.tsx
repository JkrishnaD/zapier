import Image from "next/image";
import { IoIosArrowRoundDown } from "react-icons/io";
interface ZapCellProps {
  name?: string;
  index: number;
  image: string | undefined;
  onClick: () => void;
}
export const ZapCell = ({ name, index, onClick, image }: ZapCellProps) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        onClick={onClick}
        className="border-2 border-slate-200 flex justify-center max-w-md w-[400px] cursor-pointer py-4 px-20 rounded-md bg-white hover:bg-white/60"
      >
        <div className="flex flex-row text-xl gap-x-1 items-center">
          <p className="font-bold">{index}.</p>
          {image ? <Image src={image} alt="" width={25} height={20} /> : null}
          <p className="flex flex-row items-center">{name}</p>
        </div>
      </div>
      <IoIosArrowRoundDown size={25} className="mb-1" />
    </div>
  );
};
