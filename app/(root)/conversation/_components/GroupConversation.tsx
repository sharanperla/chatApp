import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Id } from '@/convex/_generated/dataModel'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    id: Id<"conversations">,
    name:string,
    lastMessageSender?:string,
    lastMessageContent?:string

}

const GroupConversation = ({id,name,lastMessageContent,lastMessageSender}: Props) => {
  return (
   <Link href={`/conversation/${id}`} className='w-full'>
    <Card className='p-2 flex flex-row items-center gap-4 truncate'>
        <div className='flex flex-row items-center gap-4 truncate'>
            <Avatar>
               
                <AvatarFallback>
                    {name.charAt(0).toLocaleUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className='flex flex-col truncate'>
                <h4 className='truncate'>{name}</h4>
               {lastMessageSender && lastMessageContent ?<span className='text-sm text-muted-foreground flex truncate overflow-ellipsis'><p className='font-semibold'>{lastMessageSender}{" "}&nbsp;</p><p className='truncate overflow-ellipsis'>{lastMessageContent}</p></span>:<p className='text-sm text-muted-foreground truncate'> start the conversation!</p>}
            </div>
        </div>
    </Card>
   </Link>
  )
}

export default GroupConversation