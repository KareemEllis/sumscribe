import React from 'react'
import DashboardNavbar from './DashboardNavbar'

import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

export default async function DashboardLayout({ children }) {

    //Check session, redirect to login page if logged in
    const session = await auth()
    
    return (
        <>
            <SessionProvider session={session}>
                <DashboardNavbar />
                
                {children}
            </SessionProvider>
            
        </>
    )
}
