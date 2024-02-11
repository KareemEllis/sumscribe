import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export async function POST(req) {
    try {
        return NextResponse.json({ error: 'Credentials signup currently not available.' }, { status: 405 })

        const data = await req.json()

        const name = data.name.trim()
        const email = data.email.trim()
        const password = data.password.trim()

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Data missing in the request.' }, { status: 400 })
        }

        // Validation for name
        if (name == '') {
            return NextResponse.json({ error: 'Invalid name.' }, { status: 400 })
        }

        // Validation for email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
        }

        // Validation for password
        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 })
        }


        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use!' }, { status: 409 })
        }

        await db.user.create({
            data: {
                name, 
                email, 
                password: hashedPassword
            }
        })
        
        const verificationToken = await generateVerificationToken(email)
        
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return NextResponse.json({ message: 'Confirmation email sent!' }, { status: 201 })
    
    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}