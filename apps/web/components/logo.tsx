import { BiSolidZap } from "react-icons/bi";

export const Logo = () => {
  return (
    <a className="flex items-center justify-center" href="/">
      <BiSolidZap className="h-6 w-6" />
      <span className="ml-2 text-2xl font-bold">ZapFlow</span>
    </a>
  );
};
