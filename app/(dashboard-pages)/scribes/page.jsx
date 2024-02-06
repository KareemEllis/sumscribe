import React from 'react'

import Container from '@mui/material/Container'

import TranscriptionListing from '@/app/components/TranscriptionListing'

import { getAllTranscriptions } from '@/data/transcription'

export default async function Scribes() {
    const transcriptions = await getAllTranscriptions()

    return (
        <Container component='main' maxWidth="lg">
            Scribes
            <TranscriptionListing transcriptions={transcriptions}/>
        </Container>
    )
}
