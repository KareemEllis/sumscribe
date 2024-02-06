import React from 'react'
import { notFound } from 'next/navigation'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import ScribeDisplay from './ScribeDisplay'
import { getTranscription } from '@/data/transcription'

export default async function ScribeDetails({ params }) {
    const transcription = await getTranscription(parseInt(params.id))

    if (!transcription) {
        notFound()
    }

    

    return (
        <Container component='main' maxWidth="lg">
            <Typography variant='h5' fontWeight='medium' color='primary' gutterBottom>
                Title
            </Typography>
            <Typography variant='body1'  gutterBottom>
                {transcription.title}
            </Typography>

            <ScribeDisplay data={transcription}/>
            
        </Container>
    )
}
