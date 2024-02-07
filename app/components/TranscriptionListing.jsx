import React from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import InfoIcon from '@mui/icons-material/Info'

import TranscriptionCard from '@/app/components/TranscriptionCard'

export default async function TranscriptionListing({ transcriptions }) {
    const formattedTranscriptions = transcriptions.map((transcription) => {
        
        const dateObject = new Date(transcription.date_created)
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }
        const formattedDate = dateObject.toLocaleDateString('en-US', options)
        return {
            ...transcription,
            date_created: formattedDate
        }
    })


    return (
        <Grid container spacing={4} sx={{mb: 4}}>
            {
                formattedTranscriptions && formattedTranscriptions.map((transcription) => (
                    <Grid 
                        key={transcription.id} 
                        item xs={8} 
                        md={4}
                        sx={{ margin: { xs: 'auto' } }}
                    >
                        <TranscriptionCard transcription={transcription}/>
                    </Grid>
                ))
            }
            {formattedTranscriptions && formattedTranscriptions.length === 0 &&
                <Box textAlign='center' width='100%' mt={8}>
                    <InfoIcon sx={{ fontSize: 50 }}/>
                    <Typography variant='h4' fontWeight='bold'>
                    No transcriptions created yet
                    </Typography>
                    <Typography variant='subtitle1' >
                    No transcriptions found, <Link href={'/scribes/new'} style={{ textDecoration: 'underline' }}>create</Link> one now!
                    </Typography>
                </Box>
            }
        </Grid>
    )
}
