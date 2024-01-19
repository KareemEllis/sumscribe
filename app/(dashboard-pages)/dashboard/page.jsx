import React from 'react'
import Link from 'next/link'
import RecentScribes from './RecentScribes'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

export default function Dashboard() {

    const metricItems = [
        {
            count: 3,
            description: 'The number of transcriptions created',
            link: '/scribes',
            label: 'View Transcriptions'
        },
        {
            count: 2,
            description: 'The number of summaries created',
            link: '/scribes',
            label: 'View Summaries'
        },
        {
            count: 0,
            description: 'The number of scribes starred',
            link: '/starred',
            label: 'View Starred'
        }
    ]

    return (
        <Container component='main' maxWidth="lg">
            <Typography variant="h5" fontWeight='bold' gutterBottom>
                Welcome to SumScribe!
            </Typography>
            <Typography variant="subtitle1" sx={{mb: 4}}>
                {new Date().toDateString()}
            </Typography>

            <Box sx={{ display: 'flex', mb: 4 }}>
                <Typography 
                    variant='h5' 
                    fontWeight='medium'
                    noWrap
                    color='primary'
                    sx={{
                        mr: 'auto'
                    }}
                >
                    Metrics
                </Typography>
                <Button variant="contained">
                    <Link href='/scribes/new'>Create Scribe</Link>
                </Button>
            </Box>
            
            <Grid container spacing={4} justifyContent="center" sx={{mb: 4}}>
                {
                    metricItems.map((metric) => (
                        <Grid key={metric.label} item xs={8} md={4}>
                            <Card sx={{ minWidth: 200 }}>
                                <CardContent>
                                    <Typography variant='h4' fontWeight='bold' gutterBottom>
                                        {metric.count}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {metric.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size='small'>
                                        <Link href={metric.link}>{metric.label}</Link>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <Typography variant='h5' fontWeight='medium' color='primary' mb={4}>
                Recent Scribes
            </Typography>

            <RecentScribes />
        </Container>
    )
}
