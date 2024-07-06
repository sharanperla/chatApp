import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  imageUrl?: string;
  name: string;
};

const Header = ({ imageUrl, name }: Props) => {
  return (
    <Card className="w-full  flex rounded-lg items-center justify-between p-2">
      <div className="flex items-center gap-2 h-full">
        <Link href={"/conversation"} className="block lg:hidden">
          <CircleArrowLeft />
        </Link>
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{name}</h2>
      </div>
    </Card>
  );
};

export default Header;
