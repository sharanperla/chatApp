"use client"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import {MessageSquare, MessageSquareCodeIcon, User, Users, Users2} from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export const useNavigation = () => {
const pathname=usePathname()
const requestCount=useQuery(api.requests.count)
const conversations=useQuery(api.Conversations.get)
const unSeenMessageCount=useMemo(()=>{
    return conversations?.reduce((acc, curr) => acc + curr.unseenCount, 0)
},[conversations])
const paths=useMemo(()=>[{
    name:"Conversation",
    href:"/conversation",
    icon:<MessageSquare/>,
    active:pathname.startsWith("/conversation"),
    count:unSeenMessageCount
},
{
    name:"Friends",
    href:"/friends",
    icon: <Users />,
    active:pathname.startsWith("/friends"),
    count:requestCount
}
],[pathname,requestCount,unSeenMessageCount])
return paths
}

