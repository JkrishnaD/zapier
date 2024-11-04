/* eslint-disable jsx-a11y/alt-text */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { WEBHOOK_URL } from "@/config";
import { Zap } from "@/app/dashboard/page";
import { useRouter } from "next/navigation";
import { BiSolidArrowToRight } from "react-icons/bi";
import Image from "next/image";

interface ZapsTableProps {
  zaps: Zap[];
  userId: number;
}

export const ZapsTable = ({ zaps, userId }: ZapsTableProps) => {
  const router = useRouter();
  return (
    <Table className="mt-4">
      <TableCaption>The list zaps you created</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Last Edit</TableHead>
          <TableHead>Webhook_url</TableHead>
          <TableHead>Trigger</TableHead>
          <TableHead>Actions</TableHead>
          <TableHead className="text-right">Go</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {zaps.map((zap, index) => (
          <TableRow key={zap.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-semibold">{zap.name}</TableCell>
            <TableCell>
              {zap.createdAt
                ? new Date(zap.createdAt).toLocaleString("en-US", {
                    dateStyle: "short",
                    timeStyle:"short"
                  })
                : "now"}
            </TableCell>
            <TableCell className="text-xs">{`${WEBHOOK_URL}/hooks/catch/${userId}/${zap.id}`}</TableCell>

            <TableCell>
              <span className="border w-8 h-8 flex items-center justify-center">
                <Image
                  src={zap.trigger.type.image}
                  alt=""
                  width={25}
                  height={20}
                />
              </span>
            </TableCell>
            <TableCell className="flex items-center space-x-1">
              {zap.actions.map((z, index) => (
                <span
                  key={index}
                  className="border w-8 h-8 flex items-center justify-center"
                >
                  <Image src={z.type.image} alt="" width={25} height={20} />
                </span>
              ))}
            </TableCell>
            <TableCell>
              {zap.actions.map((a) => a.type.name).join(",")}
            </TableCell>
            <TableCell className="text-right">
              <Button onClick={() => router.push("/zap/" + zap.id)}>
                <BiSolidArrowToRight />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
