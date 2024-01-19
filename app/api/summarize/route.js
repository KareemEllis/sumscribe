import { NextResponse } from 'next/server'
import OpenAI from 'openai'


require('dotenv').config()

export async function POST(req) {

    const inputText = req.json()
    
    try {
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
                    'content': 'You will be provided with text that was transcribed from speech, and your task is to summarize what the text is about.'
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
        console.log(summary)

        return NextResponse.json({ summary }, { status: 200 })

    } catch (error) {
        console.error('Error:', error)

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}