import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SolanaSelector = ({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="flex flex-col space-y-2">
      <Input
        placeholder="Public addresses"
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        placeholder="sol amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        onClick={() => {
          setMetadata({
            address,
            amount,
          });
        }}
      >
        Submit
      </Button>
    </div>
  );
};
