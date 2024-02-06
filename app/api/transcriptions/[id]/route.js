import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { deleteTranscription, updateTranscription } from '@/data/transcription'

require('dotenv').config()

export async function PATCH(req, { params }) {
    try {
        const session = await auth()
        if (!session.user) {
            return NextResponse.json({ error: 'User not logged in.' }, { status: 401 })
        }

        const id = params.id
        const transcriptionData = await req.json()

        if (!transcriptionData) {
            return NextResponse.json({ error: 'Data missing in the request.' }, { status: 400 })
        }

        const updatedTranscription = await updateTranscription(transcriptionData.id, transcriptionData)
        
        if (!updateTranscription) {
            return NextResponse.json({ error: 'Failed to update transcription.' }, { status: 500 })
        }

        return NextResponse.json({ updatedTranscription }, { status: 200 })
    
    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        const session = await auth()
        if (!session.user) {
            return NextResponse.json({ error: 'User not logged in.' }, { status: 401 })
        }

        const id = parseInt(params.id)

        await deleteTranscription(id)

        return NextResponse.json({ message: 'Transcription Deleted!' }, { status: 200 })
    
    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}