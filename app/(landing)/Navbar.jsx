import React from 'react'
import Link from 'next/link'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AdbIcon from '@mui/icons-material/Adb'


function Navbar() {

    return (
        <AppBar 
            position="static" 
            sx={{
                background: '#fff',
                boxShadow: 'none'
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <AdbIcon color='primary' />
                    <Typography
                        variant="h6"
                        noWrap
                        color='primary'
                        sx={{
                            mr: 'auto',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                        }}
                    >
                        SUMSCRIBE
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Button variant="outlined">
                            <Link  href='/login'>Login</Link>
                        </Button>

                        <Button variant="contained" sx={{ ml: 2}}>
                            <Link href='signup'>Sign Up</Link>
                        </Button>
   
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Navbar