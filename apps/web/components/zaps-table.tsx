import { Zap } from "@/app/dashboard/page";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { BiSolidArrowToRight } from "react-icons/bi";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const ZapsTable = ({ zaps }: { zaps: Zap[] }) => {
  const router = useRouter();
  return (
    <Table>
      <TableCaption>The list zaps you created</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Last Edit</TableHead>
          <TableHead>Trigger</TableHead>
          <TableHead>Actions</TableHead>
          <TableHead className="text-right">Go</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {zaps.map((zap) => (
          <TableRow key={zap.id}>
            <TableCell className="font-medium"></TableCell>
            <TableCell>{zap.name}</TableCell>
            <TableCell>
              {zap.createdAt ? zap.createdAt.toLocaleString() : "now"}
            </TableCell>
            <TableCell>{zap.trigger.type.name}</TableCell>
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
