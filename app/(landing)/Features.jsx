import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TranscribeIcon from '@mui/icons-material/Transcribe'
import SummarizeIcon from '@mui/icons-material/Summarize'
import DownloadIcon from '@mui/icons-material/Download'

export default function Features() {
    const featureItems = [
        {
            icon: <TranscribeIcon color='primary' sx={{ fontSize: '50px' }}/>,
            title: 'Transcription',
            description: 'SumScribe integrates transcription AI, ensuring minimal latency and high accuracy. Capture every detail effortlessly, allowing you to focus on understanding without missing crucial information.'
        },
        {
            icon: <SummarizeIcon color='primary' sx={{ fontSize: '50px' }}/>,
            title: 'Summarization',
            description: 'Sumscribe integrates an intelligent summarization algoritm to analyze transcribed textand generate concise and coherent summaries.'
        },
        {
            icon: <DownloadIcon color='primary' sx={{ fontSize: '50px' }}/>,
            title: 'Download',
            description: 'Manage and download your scribes for easy offline access.'
        }
    ]


    return (
        <>
            <Typography variant="h3" fontWeight='bold' align="center" mb={6}>
                How It Works
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {
                    featureItems.map((feature, index) => (
                        <Grid 
                            key={feature.title} 
                            item xs={7} 
                            md={4}
                            sx={{ 
                                marginTop: { md: 
                                    index === 1 ? '25px' : '0'
                                } 
                            }}
                        >
                            <Card 
                                variant='outlined'
                                sx={{ 
                                    padding: '15px', 
                                    minHeight: '325px',
                                    textAlign: 'center'
                                }}
                            >
                                <CardContent>
                                    {feature.icon}
                                    <Typography variant="h5" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body1" color='#666666' gutterBottom>
                                        {feature.description}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}
