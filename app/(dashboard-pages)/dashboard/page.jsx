import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export default function Dashboard() {
    return (
        <main>
            <Typography variant="h5" fontWeight='medium' gutterBottom>
                Welcome to SumScribe!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {new Date().toDateString()}
            </Typography>

            <Container>
                <Typography variant='h5' fontWeight='medium'>Recent Scribes</Typography>
            </Container>
            

        </main>
    )
}
