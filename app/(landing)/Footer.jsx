import React from 'react'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export default function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                // backgroundColor: 'secondary.main',
                backgroundColor: '#f7f7f7',
                marginTop: '100px',
                py: 5 
            }}
        >
            <Container 
                maxWidth="lg" 
                sx={{ textAlign: 'center' }}
            >
                <Image src={'/SumscribeLogo.png'} alt={'Sumscribe Logo'} width={64} height={64} style={{ margin: 'auto' }}/>

                <Divider sx={{ my: 3 }} />
                    
                <Typography color="textSecondary" variant="body2">
                    {`© ${new Date().getFullYear()} SumScribe. All rights reserved.`}
                </Typography>

            </Container>
        </Box>
    )
}
