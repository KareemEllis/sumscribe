import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function NotFound() {
    return (
        <Container component='main' maxWidth="lg" sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h1" fontSize={180} fontWeight='bold' color={'primary'}>
                404
            </Typography>
            <Image 
                src={'/SumscribeLogo.png'} 
                alt={'Sumscribe Logo'} 
                width={64} 
                height={64}
                style={{ 
                    margin: 'auto',
                    marginBottom: 16
                }}
            />
            <Typography variant="h4" fontWeight='bold' sx={{ mb: 2 }}>
                Page Not Found
            </Typography>
            <Typography variant="p" >
            We could not find the page you were looking for.
            </Typography>

            <Box sx={{ mt: 2 }}>
                <Button variant="contained">
                    <Link href='/dashboard'>Back to Dashboard</Link>
                </Button>
            </Box>
        </Container>
    )
}
