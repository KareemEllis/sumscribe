import React from 'react'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Skeleton from '@mui/material/Skeleton'

export default function loading() {
    return (
        <Container component='main' maxWidth="lg">
            <Typography variant='h5' gutterBottom>
                <Skeleton />
            </Typography>
            <Typography variant='body1'  gutterBottom>
                <Skeleton />
            </Typography>
            
            <Skeleton height={50} width={250}/>

            <Skeleton height={250} width={350}/>

            <Skeleton height={50} width={100}/>

            <Skeleton height={100} width={150}/>

            

        </Container>
    )
}
