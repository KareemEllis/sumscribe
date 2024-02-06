import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

export default function TranscriptionCard({ transcription }) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
                    {transcription.audio_filename}
                </Typography>
                <Typography variant="h5" component="div">
                    {transcription.title}
                </Typography>
                <Typography>
                    {transcription.date_created}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">
                    <Link href={`/scribes/${transcription.id}`}>View</Link>
                </Button>
            </CardActions>
        </Card>
    )
}
