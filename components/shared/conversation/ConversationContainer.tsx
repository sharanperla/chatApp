import { Card } from '@/components/ui/card'
import React from 'react'

type Props=React.PropsWithChildren<{}>

const ConversationContainer= ({children}:Props) => {
  return (
    <Card className='w-full h-[calc(100svh)-32px] lg:h-full p-2 flex flex-col justify-between gap-2 bg-secondary'>
        {children}
    </Card>
  )
}

export default ConversationContainer