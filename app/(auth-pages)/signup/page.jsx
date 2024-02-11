'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import GoogleButton from '../GoogleButton'

export default function Singup() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errors, setErrors] = useState({
        firstName: { error: false, text: '' },
        lastName: { error: false, text: '' },
        email: { error: false, text: '' },
        password: { error: false, text: '' },
        confirmPassword: { error: false, text: '' }
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    
    
    const checkErrors = async () => {
        let numErrors = 0

        await setErrors({
            firstName: { error: false, text: '' },
            lastName: { error: false, text: '' },
            email: { error: false, text: '' },
            password: { error: false, text: '' },
            confirmPassword: { error: false, text: '' }
        })

        // Check if First Name Entered
        if (firstName.trim() == '') {
            await setErrors(prevErrors => ({
                ...prevErrors, firstName: {
                    error: true,
                    text: 'First Name Required'
                }
            }))
            numErrors += 1
        }
        // Check if Last Name Entered
        if (lastName.trim() === '') {
            await setErrors(prevErrors => ({
                ...prevErrors,
                lastName: {
                    error: true,
                    text: 'Last Name Required'
                }
            }))
            numErrors += 1
        }
        // Check if Email Entered
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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
        // Check if Email format correct
        else if (!emailRegex.test(email.trim())) {
            await setErrors(prevErrors => ({
                ...prevErrors,
                email: {
                    error: true,
                    text: 'Invalid Email Format'
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
        // Check if length if over 8
        else if (password.trim().length < 8) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: {
                    error: true,
                    text: 'Password must be at least 8 characters long'
                }
            }))
            numErrors += 1
        }
        
        if (confirmPassword.trim() === '') {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: {
                    error: true,
                    text: 'Confirm Password Required'
                }
            }))
            numErrors += 1
        } 
        else if (confirmPassword.trim() !== password.trim()) {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: {
                    error: true,
                    text: 'Passwords do not match'
                }
            }))
            numErrors += 1
        }
        
        return numErrors
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const numErrors = await checkErrors()

        if (numErrors > 0) {
            return
        }

        try {
            setIsSubmitting(true)
            
            const res = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
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

        } catch (error) {
            setIsSubmitting(false)
            setAlertMessage('Sign up failed')
            setAlertSeverity('error')
            console.log('Error during sign up')
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
                        Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Alert severity='info' sx={{ my: 2 }}>Credentials Signup currently not available!</Alert>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                error={errors.firstName.error}
                                helperText={errors.firstName.text}
                                label="First Name"
                                autoFocus
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                error={errors.lastName.error}
                                helperText={errors.lastName.text}
                                label="Last Name"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email.error}
                                helperText={errors.email.text}
                                label="Email Address"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password.error}
                                helperText={errors.password.text}
                                label="Password"
                                type="password"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={errors.confirmPassword.error}
                                helperText={errors.confirmPassword.text}
                                label="Confirm Password"
                                type="password"
                                disabled={true}
                            />
                        </Grid>
                    </Grid>
                    {alertMessage != '' && 
                        <Alert severity={alertSeverity} sx={{ mt: 2 }}>{alertMessage}</Alert>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={true}
                        // disabled={isSubmitting}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Sign Up
                    </Button>

                    <GoogleButton isSubmitting={isSubmitting} />
                    
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
