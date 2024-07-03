import { usePathname } from "next/navigation"
import { useMemo } from "react"
import {MessageSquare, MessageSquareCodeIcon, User, Users, Users2} from "lucide-react"

export const useNavigation = () => {
const pathname=usePathname()
const paths=useMemo(()=>[{
    name:"Conversation",
    href:"/conversation",
    icon:<MessageSquare/>,
    active:pathname.startsWith("/conversation"),
},
{
    name:"Friends",
    href:"/friends",
    icon: <Users />,
    active:pathname.startsWith("/friends"),
}
],[pathname])
return paths
}

