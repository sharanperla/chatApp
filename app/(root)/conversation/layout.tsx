import ItemList from '@/components/shared/item-list/itemList'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationLayout = ({children}: Props) => {
  return (
    <>
    <ItemList title='Conversations'>Conversation page</ItemList>
    {children}
    </>
  )
}

export default ConversationLayout