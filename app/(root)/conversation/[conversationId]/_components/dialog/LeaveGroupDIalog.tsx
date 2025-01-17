"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutationState'
import { ConvexError } from 'convex/values'
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

type Props = {
    conversationId:Id<"conversations">,
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
}

const LeaveGroupDialog = ({conversationId,open,setOpen}: Props) => {
    const {mutate:leaveGroup,pending}=useMutationState(api.Conversation.leaveGroup)
    const handleLeaveGroup=async ()=>{
        leaveGroup( {conversationId}  ).then(()=>{
                toast.success("You left the group")
            }).catch((error)=>error instanceof ConvexError?error.data : "Unexpected error occured")

    }
  return (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone .You will not be able to see any messages or send new messages to this group.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={pending}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction disabled={pending} onClick={handleLeaveGroup}>
                           Leave
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>

          </AlertDialog>
  )
}

export default LeaveGroupDialog