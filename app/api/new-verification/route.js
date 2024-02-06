import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'

require('dotenv').config()



export async function POST(req) {
    try {
        const data = await req.json()
        const token = data.token

        console.log(token)

        if (!token) {
            return NextResponse.json({ error: 'Token is missing from request' }, { status: 400 })
        }

        const existingToken = await getVerificationTokenByToken(token)

        if (!existingToken) {
            return NextResponse.json({ error: 'Token does not exist!' }, { status: 400 })
        }

        const hasExpired = new Date(existingToken.expires) < new Date()

        if (hasExpired) {
            return NextResponse.json({ error: 'Token has expired!' }, { status: 400 })
        }
  
        const existingUser = await getUserByEmail(existingToken.email)

        if (!existingUser) {
            return NextResponse.json({ error: 'Email does not exist!' }, { status: 400 })
        }

        await db.user.update({
            where: { id: existingUser.id },
            data: {
                emailVerified: new Date(),
                email: existingToken.email
            }
        })

        await db.verificationToken.delete({
            where: { id: existingToken.id }
        })

        return NextResponse.json({ message: 'Email verified!' }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}