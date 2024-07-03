import ItemList from '@/components/shared/item-list/itemList'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationLayout = ({children}: Props) => {
  return (
    <>
    <ItemList title='Conversations'>{children}</ItemList>
 
    </>
  )
}

export default ConversationLayout