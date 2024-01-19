import React from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import InfoIcon from '@mui/icons-material/Info'

async function getRecentScribes() {
    const res = await fetch('http://localhost:4000/scribes', { next: { revalidate: 60 } })

    if(!res.ok) {
        //Scnackbar
        console.log('error')
        throw new Error('Failed to fetch recent scribes')
    }

    const scribes = await res.json()
    const recentScribes = scribes.slice(-3).map((scribe) => {
        const dateObject = new Date(scribe.date_created)
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }
        const formattedDate = dateObject.toLocaleDateString('en-US', options)
        return {
            ...scribe,
            date_created: formattedDate
        }
    })
    return recentScribes
}

export default async function RecentScribes() {
    const scribes = await getRecentScribes()

    return (
        <Grid container spacing={4} justifyContent="center" sx={{mb: 4}}>
            {
                scribes.map((scribe) => (
                    <Grid key={scribe.id} item xs={8} md={4}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="secondary" gutterBottom>
                                    {scribe.audio_filename}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {scribe.title}
                                </Typography>
                                <Typography>
                                    {scribe.date_created}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">
                                    <Link href={`/scribes/${scribe.id}`}>View scribe</Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
            {scribes.length === 0 &&
                <Box textAlign='center' mt={8}>
                    <InfoIcon sx={{ fontSize: 50 }}/>
                    <Typography variant='h4' fontWeight='bold'>
                    No scribes created yet
                    </Typography>
                    <Typography variant='subtitle1' >
                    No scribes found, <Link href={'/scribes/new'} style={{ textDecoration: 'underline' }}>create</Link> one now!
                    </Typography>
                </Box>
            }
            

        </Grid>
    )
}
