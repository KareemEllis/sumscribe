import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

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
                    <Box
                        sx={{
                            mr: 'auto',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                        }}
                    >
                        <Link href={'/'}>
                            <Image src={'/SumscribeLogo.png'} alt={'Sumscribe Logo'} width={64} height={64}/>
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Button variant="text">
                            <Link  href='/login'>Login</Link>
                        </Button>

                        <Button variant="outlined" sx={{ ml: 2}}>
                            <Link href='signup'>Sign Up</Link>
                        </Button>
   
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Navbar