import React from 'react'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

//Icons
import Chip from '@mui/material/Chip'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import DoneIcon from '@mui/icons-material/Done'

import ToggleFavorite from './ToggleFavorite'

export default function TranscriptionCard({ transcription }) {

    

    return (
        <Card sx={{ minWidth: 200 }}>
            <CardContent>
                <Typography variant='subtitle2' fontWeight='bold' color="secondary" fontSize={12} gutterBottom>
                    {transcription.audio_filename}
                </Typography>
                <Typography variant="h5" >
                    {transcription.title}
                </Typography>
                <Typography variant='body2'>
                    {transcription.date_created}
                </Typography>

                <Typography variant='body1' maxHeight={130} sx={{ overflow: 'hidden' }}>
                    {transcription.transcription}
                </Typography>

                
                {transcription.summary &&
                    <Chip icon={<DoneIcon />} label="Summarized" variant="outlined" size="small" sx={{ transform: 'translate(0, 15px)' }}/>
                }
            </CardContent>
            
            <CardActions>
                <Link href={`/scribes/${transcription.id}`}>
                    <Button size="small" sx={{ color: '#000' }} startIcon={<OpenInNewIcon />} >
                        Go
                    </Button>
                </Link>

                <ToggleFavorite transcription={transcription} />
            </CardActions>
        </Card>
    )
}
