import React from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import TranscriptionListing from '@/app/components/TranscriptionListing'

import { getAllTranscriptions } from '@/data/transcription'

export const metadata = {
    title: 'Sumscribe | Scribes'
}

export default async function Scribes() {
    const transcriptions = await getAllTranscriptions()

    return (
        <Container component='main' maxWidth="lg">
            <Typography variant='h5' fontWeight='medium' color='primary' mb={2}>
                Scribes
            </Typography>
            <TranscriptionListing transcriptions={transcriptions}/>
        </Container>
    )
}
