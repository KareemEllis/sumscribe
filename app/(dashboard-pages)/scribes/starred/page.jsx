import React from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import TranscriptionListing from '@/app/components/TranscriptionListing'

import { getAllTranscriptions } from '@/data/transcription'

export default async function StarredTranscriptions() {
    const transcriptions = await getAllTranscriptions()

    const starredTranscriptions = await transcriptions.filter((item) => {
        return item.starred
    })

    return (
        <Container component='main' maxWidth="lg">
            <Typography variant='h5' fontWeight='medium' color='primary' mb={2}>
                Favorited Scribes
            </Typography>
            <TranscriptionListing transcriptions={starredTranscriptions}/>
        </Container>
    )
}
