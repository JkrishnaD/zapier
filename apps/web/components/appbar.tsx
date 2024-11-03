import { BiSolidZap } from "react-icons/bi";
import { Button } from "./ui/button";
import { Logo } from "./logo";

export const Appbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Logo/>
      <nav className="ml-auto flex gap-4 sm:gap-6 lg:mr-10 justify-center items-center">
        <a
          className="text-base font-semibold hover:underline underline-offset-4 lg:px-5"
          href="#"
        >
          Features
        </a>
        <a
          className="text-base font-semibold hover:underline underline-offset-4  lg:px-5"
          href="/login"
        >
          Login
        </a>
        <a
          className="text-base font-semibold hover:underline underline-offset-4  lg:px-5"
          href="/signup"
        >
          <Button type="submit" className="bg-[#00a5ff] font-semibold">
            Signup
          </Button>
        </a>
      </nav>
    </header>
  );
};
