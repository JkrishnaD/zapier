import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useState } from "react";
import { useUserId } from "./use-user-id";

interface Zap {
  id: string;
  name: string;
  triggerId: string;
  userId: number;
  actions: [
    {
      id: string;
      zapId: string;
      availableActionId: string;
      metadata: {};
      sortingOrder: number;
      type: {
        id: string;
        name: string;
        metadata: {};
      };
    },
  ];
}

export const useZaps = async () => {
  const [zaps, setZaps] = useState<Zap[]>([]);
  const [userId, setUserId] = useUserId();

  await axios.get(`${BACKEND_URL}/api/v1/zap/${userId}`).then((res) => {
    setZaps(res.data.zaps);
  });
  const isLoading = zaps === undefined;
  
  return {
    zaps,
    isLoading,
  };
};
