import SideBarWrapper from '@/components/shared/sideBar/SideBarWrapper'
import React from 'react'

type Props =React.PropsWithChildren<{}>

const Layout = ({children}:Props) => {
  return <SideBarWrapper>
    {children}
    </SideBarWrapper>
}
export default Layout