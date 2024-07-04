"use client";

import { Card } from "@/components/ui/card";
import { TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/clerk-react";
import { Tooltip, TooltipContent } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConversation } from "@/hooks/useConversation";
import { ThemeToggle } from "@/components/ui/theme/Theme-toggel";
import { Badge } from "@/components/ui/badge";

const MobileNav = () => {
  const paths = useNavigation();
  const { isActive } = useConversation();
  if (isActive) return null;

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size="icon"
                        variant={path.active ? "default" : "outline"}
                      >
                        {path.icon}
                      </Button>
                      {path.count? <Badge className="absolute left-7 bottom-6">{path.count}</Badge>:null}
                    </TooltipTrigger>
                    <TooltipContent
                      align="center"
                      side="bottom"
                      style={{ zIndex: 9999 }}
                      className="bg-white rounded-sm p-2 text-black m-2 shadow-xl "
                    >
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};
export default MobileNav;
