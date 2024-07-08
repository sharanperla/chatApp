"use client";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDialog from "./_components/dialog/RemoveFriendDialog";
import DeletGroupDialog from "./_components/dialog/DeleteGroupDIalog"
import LeaveGroupDialog from "./_components/dialog/LeaveGroupDIalog";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);

  const conversation = useQuery(api.Conversation.get, { id: conversationId });
  return conversation === undefined ? (
    <div className="w-full  flex items-center justify-center">
      <Loader2 className="h-8 w-8" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex items-center justify-center">
      conversation not found
    </p>
  ) : (
    <ConversationContainer>
      <RemoveFriendDialog
      conversationId={conversationId}
      open={removeFriendDialogOpen}
      setOpen={setRemoveFriendDialogOpen}
      />
      <LeaveGroupDialog
      conversationId={conversationId}
      open={leaveGroupDialogOpen}
      setOpen={setLeaveGroupDialogOpen}
      />
      <DeletGroupDialog
      conversationId={conversationId}
      open={deleteGroupDialogOpen}
      setOpen={setDeleteGroupDialogOpen}
      />
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username) || " "
        }
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
        options={
          conversation.isGroup
            ? [
                {
                  label: "Leave group",
                  destructive: false,
                  onClick: () => setLeaveGroupDialogOpen(true),
                },
                {
                  label: "Delete group",
                  destructive: true,
                  onClick: () => setDeleteGroupDialogOpen(true),
                },
                
              ]
            : [
              {
                label: "Remove friend",
                destructive: true,
                onClick: () => setRemoveFriendDialogOpen(true),
              },
            ]
        }
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
