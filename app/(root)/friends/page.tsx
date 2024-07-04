import ConversationFallBack from '@/components/shared/conversation/ConversationFallBack'
import ItemList from '@/components/shared/item-list/itemList'
import React from 'react'
import AddFriendDialog from './_components/AddFriendDialog'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <><ItemList title={"Friends"} action={<AddFriendDialog/>}>
        hello prends
    </ItemList>
    <ConversationFallBack/>
    </>
  )
}

export default FriendsPage