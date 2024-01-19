import { NextResponse } from 'next/server'

require('dotenv').config()

export async function POST(req) {
    try {
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

        console.log('FormData:', formData)

        const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            method: 'POST',
            body: formData,
        })

        if(!res.ok) {
            return NextResponse.json({ error: 'Internal Server Error. Transcription Failed.' }, { status: 500 }) 
        }

        const transcription = await res.json()

        console.log(transcription)

        return NextResponse.json({ transcription }, { status: 200 })

    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}