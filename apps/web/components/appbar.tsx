"use client";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { useCurrentuser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";

export const Appbar = () => {
  const user = useCurrentuser();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Logo />
      {user ? (
        <div className="ml-auto flex items-center space-x-2">
          <p className="font-semibold capitalize">
            {(user as { user: { name: string } }).user.name}
          </p>
          <Button onClick={handleLogout} variant={"destructive"} className="font-semibold">Logout</Button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </header>
  );
};
