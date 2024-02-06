import React from 'react'

import Container from '@mui/material/Container'

import EditTranscriptionForm from './EditTranscriptionForm'
import { getTranscription } from '@/data/transcription'

export default async function EditTranscription({ params }) {
    const transcription = await getTranscription(parseInt(params.id))

    if (!transcription) {
        notFound()
    }

    return (
        <Container component='main' maxWidth="lg">
            <EditTranscriptionForm transcription={transcription}/>
        </Container>
    )
}
