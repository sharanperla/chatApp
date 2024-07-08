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

const DeletGroupDialog = ({conversationId,open,setOpen}: Props) => {
    const {mutate:deleteGroup,pending}=useMutationState(api.Conversation.deleteGroup)
    const handleDeleteGroup=async ()=>{
        deleteGroup( {conversationId}  ).then(()=>{
                toast.success("Group deleted")
            }).catch((error)=>error instanceof ConvexError? error.data : "Unexpected error occured")

    }
  return (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone .All messages will be deleted and you will not be able to message this group.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={pending}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction disabled={pending} onClick={handleDeleteGroup}>
                           Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogHeader>
            </AlertDialogContent>

          </AlertDialog>
  )
}

export default DeletGroupDialog