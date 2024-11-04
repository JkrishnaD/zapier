"use client";
import { useUserId } from "./use-user-id";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export const useCurrentuser = () => {
  const [userId] = useUserId();
  const [user, setUser] = useState<null>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/api/v1/user/${userId}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      fetchUser();
    }
  }, [token, userId]);

  return user;
};
