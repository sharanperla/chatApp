import { Card } from '@/components/ui/card'
import React from 'react'



const ConversationFallBack = () => {
  return (
    <Card className='hidden lg:flex h-full w-full p-2 items-center justify-center bg-black text-secondary-foreground'>
        Select or start a conversation to get started!
    </Card>
  )
}

export default ConversationFallBack