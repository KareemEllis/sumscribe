import React from 'react'
import DashboardNavbar from './dashboard/DashboardNavbar'

export default function DashboardLayout({ children }) {

    //Check session, redirect to login page if logged in
    
    return (
        <>
            <DashboardNavbar />
            {children}
        </>
    )
}
