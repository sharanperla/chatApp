"use client";

import ItemList from "@/components/shared/item-list/itemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import DMcoversation from "./_components/DMcoversation";
import CreateGroupDialog from "./_components/CreateGroupDIalog";
import GroupConversation from "./_components/GroupConversation";

type Props = React.PropsWithChildren<{}>;

const ConversationLayout = ({ children }: Props) => {
  const conversations = useQuery(api.Conversations.get);
  return (
    <>
      <ItemList title="Conversations" action={<CreateGroupDialog/>}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No conversation found
            </p>
          ) : (
            conversations.map((conversation) => {
              return conversation.conversation.isGroup ? (
                <GroupConversation
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  name={conversation.conversation.name || ""}
                  lastMessageContent={conversation.lastMessage?.content}
                  lastMessageSender={conversation.lastMessage?.sender}
                />
              ) : (
                <DMcoversation
                  key={conversation.conversation._id}
                  id={conversation.conversation._id}
                  username={conversation.otherMember?.username || ""}
                  imageUrl={conversation.otherMember?.imageUrl || ""}
                  lastMessageContent={conversation.lastMessage?.content}
                  lastMessageSender={conversation.lastMessage?.sender}
                />
              );
            })
          )
        ) : (
          <Loader2 />
        )}
      </ItemList>
      {children}
    </>
  );
};

export default ConversationLayout;
