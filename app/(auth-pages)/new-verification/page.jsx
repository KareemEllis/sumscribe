'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import Alert from '@mui/material/Alert'

import { useSearchParams } from 'next/navigation'

export default function NewVerification() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const searchParams = useSearchParams()

    const token = searchParams.get('token')

    const onSubmit = useCallback(async () => {
        if (!token) {
            setIsSubmitting(false)
            setAlertMessage('Missing token!')
            setAlertSeverity('error')
        }

        try {
            setIsSubmitting(true)
            
            const res = await fetch('/api/new-verification', {
                method: 'POST',
                body: JSON.stringify({
                    token
                })
            })

            setIsSubmitting(false)

            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setAlertMessage(data.message)
                setAlertSeverity('success')
            }
            else {
                const data = await res.json()
                console.log(data)
                setAlertMessage(data.error)
                setAlertSeverity('error')
            }
        } 
        catch (error) {
            setIsSubmitting(false)
            setAlertMessage('Verification Failed.')
            setAlertSeverity('error')
            console.log('Error during verification')
        }

        console.log(token)
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                        Confirming your verification
                </Typography>

                {alertMessage == '' && 
                    <CircularProgress sx={{ mt: 3, mb: 3 }}/>
                }
                {alertMessage != '' && 
                    <Alert severity={alertSeverity} sx={{ mt: 3, mb: 3 }}>{alertMessage}</Alert>
                }

                <Link href="/login" variant="body2">
                    Back to Login
                </Link>
                
            </Box>
        </Container>
    )
}
