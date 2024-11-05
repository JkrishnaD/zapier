import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function EmailSelector({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  return (
    <div className="flex flex-col space-y-2">
      <Input
        placeholder="To email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Email body"
        onChange={(e) => setBody(e.target.value)}
      />
      <Button
        onClick={() => {
          setMetadata({
            email,
            body,
          });
        }}
      >
        Submit
      </Button>
    </div>
  );
}
