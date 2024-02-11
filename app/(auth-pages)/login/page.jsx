'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'

import GoogleButton from '../GoogleButton'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({
        email: { error: false, text: '' },
        password: { error: false, text: '' }
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const checkErrors = async () => {
        let numErrors = 0

        setAlertMessage('')

        await setErrors({
            email: { error: false, text: '' },
            password: { error: false, text: '' }
        })

        // Check if Email Entered
        if (email.trim() === '') {
            await setErrors(prevErrors => ({
                ...prevErrors,
                email: {
                    error: true,
                    text: 'Email Required'
                }
            }))
            numErrors += 1
        } 

        // Check if Password Entered
        if (password.trim() === '') {
            await setErrors(prevErrors => ({
                ...prevErrors,
                password: {
                    error: true,
                    text: 'Password Required'
                }
            }))
            numErrors += 1
        }

        else if(password.trim() != password) {
            await setErrors(prevErrors => ({
                ...prevErrors,
                password: {
                    error: true,
                    text: 'Password cannot start or end with spaces'
                }
            }))
            numErrors += 1
        }
        
        return numErrors
    }

    //PREVENT SPACES IN PASSWORD FOR SIGNUP

    const handleSubmit = async (event) => {
        event.preventDefault()

        const numErrors = await checkErrors()

        if (numErrors > 0) {
            return
        }

        try {
            setIsSubmitting(true)
            
            const res = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
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
            console.log(error)
            setIsSubmitting(false)
            setAlertMessage('Login failed')
            setAlertSeverity('error')
            console.log('Error during Login')
        }

    }


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
                <Image src={'/SumscribeLogo.png'} alt={'Sumscribe Logo'} width={64} height={64}/>
                
                <Typography component="h1" variant="h5" mt={2}>
                        Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Alert severity='info' sx={{ my: 2 }}>Credentials Login currently not available!</Alert>
                    <TextField
                        margin="normal"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={errors.email.error}
                        helperText={errors.email.text}
                        label="Email Address"
                        disabled={true}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={errors.password.error}
                        helperText={errors.password.text}
                        label="Password"
                        type="password"
                        disabled={true}
                    />

                    {alertMessage != '' && 
                        <Alert severity={alertSeverity} sx={{ mt: 2 }}>{alertMessage}</Alert>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={true}
                        // disabled={isSubmitting}
                        sx={{ mt: 3, mb: 2 }}
                        
                    >
                        Sign In
                    </Button>

                    <GoogleButton isSubmitting={isSubmitting} />

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {'Don\'t have an account? Sign Up'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
