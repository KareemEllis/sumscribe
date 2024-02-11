import React from 'react'

import Container from '@mui/material/Container'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function loading() {
    return (
        <Container component='main' maxWidth="lg">
            <Typography variant="h5" fontWeight='bold'>
                <Skeleton />
            </Typography>

            <Skeleton>
                <TextField  
                    sx={{maxWidth: '500px', width: '100%', marginTop: 4 }}
                />
            </Skeleton>
           
            <Skeleton>
                <Input
                    type="file"
                    sx={{ display: 'block', maxWidth: '500px', marginTop: 4 }}
                />
            </Skeleton>

            <Button 
                sx={{ marginTop: 4 }}
            >
                <Skeleton />
            </Button>
        </Container>
    )
}
