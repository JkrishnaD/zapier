"use client";
import { Appbar } from "@/components/appbar";
import { Button } from "@/components/ui/button";
import { ZapsTable } from "@/components/zaps-table";
import { BACKEND_URL } from "@/config";
import { useUserId } from "@/hooks/use-user-id";
import axios from "axios";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Zap {
  id: string;
  name: string;
  triggerId: string;
  userId: number;
  createdAt: Date | "";
  actions: [
    {
      id: string;
      zapId: string;
      availableActionId: string;
      metadata: object;
      sortingOrder: number;
      type: {
        id: string;
        name: string;
        metadata: object;
      };
    },
  ];
  trigger: {
    id: string;
    zapId: string;
    availableTriggerId: string;
    metadata: object;
    type: {
      id: string;
      name: string;
      metadata: object;
    };
  };
}

const DashboardPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useUserId();
  const [zaps, setZaps] = useState<Zap[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserId(Number(localStorage.getItem("userId")));
    axios
      .get(`${BACKEND_URL}/api/v1/zap/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setIsLoading(false);
      });
    console.log(token);
  }, [setUserId, userId]);

  console.log("zaps", zaps);
  return (
    <div className="h-screen">
      <Appbar />
      <div className="flex justify-center items-center pt-8 flex-col">
        <div className="flex max-w-screen-lg justify-between w-full">
          <div>
            <p className="font-bold text-xl">My zaps</p>
          </div>
          <Button
            className="font-semibold"
            onClick={() => router.push("/zap/create")}
          >
            <Plus className="size-6" /> Create
          </Button>
        </div>
        <div className="max-w-screen-lg w-full h-full">
          {isLoading ? (
            <div className="text-center mr-2 flex justify-center items-center h-full">
              <Loader className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ZapsTable zaps={zaps} />
          )}
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
