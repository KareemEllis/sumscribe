import React from 'react'

import Container from '@mui/material/Container'

import TranscriptionListing from '@/app/components/TranscriptionListing'

import { getAllTranscriptions } from '@/data/transcription'

export default async function StarredTranscriptions() {
    const transcriptions = await getAllTranscriptions()

    const starredTranscriptions = await transcriptions.filter((item) => {
        return item.starred
    })

    return (
        <Container component='main' maxWidth="lg">
            Scribes
            <TranscriptionListing transcriptions={starredTranscriptions}/>
        </Container>
    )
}
