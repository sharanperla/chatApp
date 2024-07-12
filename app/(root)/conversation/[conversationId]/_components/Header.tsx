import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { CircleArrowLeft, CirclePlus, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import AudioCall from "./streaming/AudioCall";
import { Id } from "@/convex/_generated/dataModel";



type Props = {
  imageUrl?: string;
  name: string;
  options?: {
    label: string;
    destructive: boolean;
    onClick: () => void;
  }[];
  userId:Id<"users">,
  peerId:Id<"users">|undefined
};



const Header = ({ imageUrl, name, options,userId,peerId}: Props) => {
  // if(peerId===undefined)
  // {
  //   peerId=userId
  // }
 
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
      <div className="flex gap-2">
      {/* <Tooltip>
        <TooltipTrigger>
          {
            peerId!==undefined&&<AudioCall userId={userId} peerId={peerId} />
          }
        </TooltipTrigger>
        <TooltipContent>
          <p>Audio call</p>
        </TooltipContent>
      </Tooltip> */}
        {options ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="secondary">
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {options.map((option, id) => {
                return (
                  <DropdownMenuItem
                    key={id}
                    onClick={option.onClick}
                    className={cn("font-semibold", {
                      "text-destructive": option.destructive,
                    })}
                  >
                    {option.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
   
    </Card>
  );
};

export default Header;
