import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export const useGetTriggersActions = () => {
  const [availableTriggers, setAvailableTrigges] = useState([]);
  const [availableActions, setavailableActions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`${BACKEND_URL}/api/v1/triggers/available`)
          .then((x) => setAvailableTrigges(x.data.availableTriggers));
        axios
          .get(`${BACKEND_URL}/api/v1/actions/available`)
          .then((x) => setavailableActions(x.data.availableActions));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[]);
  return {
    availableTriggers,
    availableActions,
  };
};
