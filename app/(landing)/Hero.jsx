import React from 'react'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import LottieAnimation from './LottieAnimation'

export default function Hero() {
    return (
        <Grid container spacing={2} sx={{ my: '70px' }}>
            <Grid item xs={12} md={6} sx={{ textAlign: {xs: 'center', md: 'left'} }}>
                <Typography variant="h2" fontWeight='800'>
                    Unlock <Typography variant="span" color='secondary'>Seamless Learning</Typography> with SumScribe using AI
                </Typography>
                <Typography variant="subtitle1" my={3} color='#4a4949'>
                    Revolutionize your educational journey with SumScribe, 
                    the cutting-edge <Typography variant="span" fontWeight='bold'>Voice-to-Text</Typography> Summarization app. 
                    Say goodbye to traditional note-taking hurdles 
                    and welcome a world where every lecture becomes a captivating experience.
                </Typography>
                <Link href='signup'>
                    <Typography variant="body1" sx={{ textDecoration: 'underline' }}>{'Get Started >'}</Typography>
                </Link>


            </Grid>
            <Grid item md={6} sx={{display: {xs: 'none', md: 'block'}}}>
                <LottieAnimation />
            </Grid>
        </Grid>
    )
}
