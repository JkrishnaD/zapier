"use client";
import { Appbar } from "@/components/appbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      email,
      password,
    });
    localStorage.setItem("userId",res.data.userId)
    localStorage.setItem("token", res.data.token);
    router.push("/dashboard");
  };
  return (
    <section className="min-h-screen w-full bg-gray-100">
      <Appbar />
      <div className="flex justify-center items-center min-h-[90vh]">
        <div className="bg-white border p-6 max-w-md w-full rounded-xl">
          <div className="flex flex-col">
            <div className="flex justify-center flex-col items-center">
              <span className="text-2xl text-black font-bold">Login</span>
            </div>
            <div className="py-2 space-y-3 mt-2">
              <Input
                type="email"
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-2 w-full">
              <Button
                type="submit"
                className="font-semibold bg-[#00a5ff] hover:bg-[#00a5ff]/80 w-full"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
            <div className="bg-gray-400 h-[0.1px] my-4" />
            <div className="flex flex-col space-y-2 ">
              <Button variant="outline" className="font-semibold">
                Google <FcGoogle className="size-10" />
              </Button>
              <Button className="font-semibold bg-[#24292E] text-white">
                Github <FaGithub className="size-5" />
              </Button>
              <span className="flex justify-center text-gray-600">
                Create New
                <Link
                  href="/signup"
                  className="pl-1 font-semibold hover:underline"
                >
                  Account.
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
