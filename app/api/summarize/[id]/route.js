import { NextResponse } from 'next/server'

import OpenAI from 'openai'

import { auth } from '@/auth'
import { getTranscription, updateTranscription } from '@/data/transcription'

require('dotenv').config()

import { Ratelimit } from '@upstash/ratelimit' // for deno: see above
import { Redis } from '@upstash/redis' // see below for cloudflare and fastly adapters

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const summarizeRatelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '1440 m'),
    analytics: true,
})

export async function POST(req, { params }) {
    try {
        const session = await auth()
        if (!session.user) {
            return NextResponse.json({ error: 'User not logged in.' }, { status: 401 })
        }

        const { success } = await summarizeRatelimit.limit(session.user.id)

        if (!success) {
            return NextResponse.json({ error: 'Transcription limit exceeded.' }, { status: 429 })
        }
        
        const id = parseInt(params.id)

        const transcriptionData = await getTranscription(id)

        const inputText = transcriptionData.transcription

        // Calculate max_tokens based on input text length
        const maxTokensMultiplier = 0.5 // Adjust based on your preference
        let maxTokens = Math.ceil(inputText.length * maxTokensMultiplier)

        // Set an upper limit for max_tokens
        const maxTokensUpperLimit = 500 // Adjust based on your desired upper limit

        // Cap max_tokens if it exceeds the upper limit
        maxTokens = Math.min(maxTokens, maxTokensUpperLimit)

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        })

        const res = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    'role': 'system',
                    'content': 'Summarize the given text and format it in markdown.\n\n##### Formatting Requirements:\n- Include titles, headers, bold, italic, quotes, and lists where possible.\n- Use markdown syntax for proper formatting.\n\n##### Output Expectation:\nProvide a concise summary of the given text, formatted in markdown, following the specified requirements.'
                },
                {
                    'role': 'user',
                    'content': inputText
                }
            ],
            temperature: 1,
            max_tokens: maxTokens, // Adjusted based on text length with upper limit
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })

        const summary = res.choices[0].message.content

        const newTranscriptionData = {
            ...transcriptionData,
            summary
        }

        const updatedTranscription = await updateTranscription(transcriptionData.id, newTranscriptionData)

        return NextResponse.json(updatedTranscription , { status: 200 })

    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}