import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { NextResponse } from 'next/server'
import { AuthError } from 'next-auth'

require('dotenv').config()

import { generateVerificationToken } from '@/lib/tokens'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'

export async function POST(req) {
    try {
        return NextResponse.json({ error: 'Credentials login currently not available.' }, { status: 405 })

        const data = await req.json()
        const email = data.email
        const password = data.password

        if (!email || !password) {
            return NextResponse.json({ error: 'Data missing in the request.' }, { status: 400 })
        }

        const existingUser = await getUserByEmail(email)

        if (!existingUser || !existingUser.email || !existingUser.password) {
            return NextResponse.json({ error: 'Email does not exist!' }, { status: 400 })
        }

        if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email)
            
            await sendVerificationEmail(verificationToken.email, verificationToken.token)
            
            return NextResponse.json({ message: 'Confirmation email sent!' }, { status: 201 })
        }

        
        try {
            await signIn('credentials', {
                email,
                password,
                redirectTo: DEFAULT_LOGIN_REDIRECT
            })

            //return NextResponse.redirect('/dashboard', 302)

        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                case 'CredentialsSignin':
                    return NextResponse.json({ error: 'Invalid Credentaials' }, { status: 401 })
                default:
                    return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 })
                }
            }

            throw error
        }
        

        return NextResponse.json({ message: 'Login Successful' }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}