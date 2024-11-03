import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter max-w-[900px] sm:text-4xl md:text-5xl lg:text-6xl text-center">
                Automate Your Workflow with ZapFlow
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 text-center">
                Connect your apps and automate workflows in minutes. No coding
                required.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit" className="bg-[#00a5ff] font-semibold">
                    <Link href="/signup">Get started</Link>
                </Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Start your free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
