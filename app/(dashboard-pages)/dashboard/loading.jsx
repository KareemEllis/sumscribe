import React from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

import Skeleton from '@mui/material/Skeleton'

export default function loading() {
    return (
        <Container component='main' maxWidth="lg">
            <Typography variant="h5" fontWeight='bold' gutterBottom>
                <Skeleton />
            </Typography>
            <Typography variant="subtitle1" sx={{mb: 4}}>
                <Skeleton />
            </Typography>

            <Box sx={{ display: 'flex', mb: 4, alignItems: 'center' }}>
                <Typography 
                    variant='h5' 
                    fontWeight='medium'
                    noWrap
                    color='primary'
                    sx={{
                        mr: 'auto'
                    }}
                >
                    <Skeleton width={210} height={40} />
                </Typography>

                <Skeleton width={150} height={60} />
                
                    
                
            </Box>
            
            <Grid container spacing={4} justifyContent="center" sx={{mb: 4}}>
                {
                    [0,0,0].map((item, index) => (
                        <Grid key={index} item xs={8} md={4}>
                            <Card variant="outlined" sx={{ minWidth: 200 }}>
                                <CardContent>
                                    <Typography variant='h4' fontWeight='bold' gutterBottom>
                                        <Skeleton />
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        <Skeleton />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Skeleton width={120} height={30} />
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
            <Typography variant='h5' fontWeight='medium' color='primary' mb={4}>
                <Skeleton />
            </Typography>

            {/* Transcription Listing */}
            <Grid container spacing={4} sx={{mb: 4}}>
                {
                    [0,0,0].map((item, index) => (
                        <Grid 
                            key={index} 
                            item xs={8} 
                            md={4}
                            sx={{ margin: { xs: 'auto' } }}
                        >
                            <Skeleton variant="rectangular" width={210} height={118} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}
