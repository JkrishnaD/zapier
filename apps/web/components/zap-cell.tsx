export const ZapCell = ({ name, index }: { name?: string; index: number }) => {
  return (
    <div className="border border-black flex justify-center max-w-md cursor-pointer py-4 px-20 m-2 rounded-md bg-white hover:bg-white/60">
      <div className="flex flex-row text-xl gap-x-1">
        <div className="font-bold">{index}.</div>
        <div>{name}</div>
      </div>
    </div>
  );
};
