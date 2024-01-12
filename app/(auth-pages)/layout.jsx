import React from 'react'

export default function Authlayout({ children }) {

    //Check session, redirect to dashboard if logged in
    
    return (
        <>
            <nav>
                <h1>AuthLayout</h1>
            </nav>
            {children}
        </>
    )
}
