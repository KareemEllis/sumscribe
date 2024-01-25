import { NextResponse } from 'next/server'

require('dotenv').config()

export async function POST(req) {
    try {
        const data = await req.json()
        const email = data.email
        const password = data.password

        if (!email || !password) {
            return NextResponse.json({ error: 'Data missing in the request.' }, { status: 400 })
        }

        

        return NextResponse.json({ message: 'Test Complete' }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}