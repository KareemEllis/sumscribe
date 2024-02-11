import React from 'react'
import Box from '@mui/material/Box'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function CallToAction() {
    return (
        <Box
            sx={{
                textAlign: 'center',
                p: 4,
                mt: 8,
                backgroundColor: '#060023',
                borderRadius: 2,
            }}
        >
            <Typography
                variant='h5'
                color='#fff'
                fontWeight='bold'
                mb={2}
            >
                Join Sumscribe today
            </Typography>
            <Typography
                variant='body1'
                color='#fff'
                sx={{ maxWidth: 700, margin: 'auto', mb: 2 }}
            >
                Transform the way you absorb information during 
                lectures and stay at the forefront of your educational journey. 
                With SumScribe, your path to efficient learning starts now
            </Typography>
            
            <Button
                variant="contained"
                endIcon={<ChevronRightIcon />}
                sx={{ 
                    backgroundColor: '#fff', 
                    color: '#060023',
                    ':hover': { backgroundColor: '#ddd'  }
                }}
            >
                <Link href='signup'>Get Started</Link>
            </Button>
        </Box>
    )
}
