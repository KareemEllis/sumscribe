import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { createTranscription } from '@/data/transcription'
require('dotenv').config()

//CREATE NEW TRANSCRIPTION
export async function POST(req) {
    try {
        const session = await auth()
        if (!session.user) {
            return NextResponse.json({ error: 'User not logged in.' }, { status: 401 })
        }

        const data = await req.formData()
        const title = data.get('title')
        const audioFile = data.get('file')
        
        // Ensure the request includes the required data
        if (!title || !audioFile) {
            return NextResponse.json({ error: 'Data missing in the request.' }, { status: 400 })
        }

        // Ensure file size is under 25MB
        if (audioFile.size > 25 * 1024 * 1024) {
            return NextResponse.json({ error: 'Please upload an audio file less than 25MB' }, { status: 400 })
        }

        // Check if the file is an audio file with allowed types
        if (!/^audio\/(mp3|mp4|mpeg|mpga|m4a|wav)$/.test(audioFile.type)) {
            return NextResponse.json({ error: 'Please upload a valid audio file (mp3, mp4, mpeg, mpga, m4a, wav)' }, { status: 400 })
        }

        const formData = new FormData()
        formData.append('model', 'whisper-1')
        formData.append('file', audioFile)

        const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            method: 'POST',
            body: formData,
        })

        if(!res.ok) {
            return NextResponse.json({ error: 'Transcription Failed.' }, { status: 500 }) 
        }

        const transcription = await res.json()

        const savedTranscription = await createTranscription(title, transcription.text, audioFile.name)

        if (!savedTranscription) {
            return NextResponse.json({ error: 'Failed to save transcription.' }, { status: 500 })
        }

        return NextResponse.json(savedTranscription, { status: 201 })

    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}