"use client"

import ItemList from '@/components/shared/item-list/itemList'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import React from 'react'
import DMcoversation from './_components/DMcoversation'

type Props = React.PropsWithChildren<{}>

const ConversationLayout = ({children}: Props) => {
  const conversations=useQuery(api.Conversations.get)
  return (
    <>
    <ItemList title='Conversations'>{conversations? conversations.length ===0 ? <p className='w-full h-full flex items-center justify-center'>No conversation found</p> : conversations.map((conversation)=>{
      return conversation.conversation.isGroup? null: (<DMcoversation key={conversation.conversation._id} id={conversation.conversation._id} username={conversation.otherMember?.username || ""}  imageUrl={conversation.otherMember?.imageUrl || ""} />)

    }

    ) : <Loader2/>}</ItemList>
    {children}
    </>
  )
}

export default ConversationLayout