import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack'
import ItemList from '@/components/shared/item-list/itemList'
import React from 'react'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <><ItemList title={"Friends"}>
        hello prends
    </ItemList>
    <ConversationFallBack/>
    </>
  )
}

export default FriendsPage