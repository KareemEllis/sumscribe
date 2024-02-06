'use client'
import React from 'react'

import Button from '@mui/material/Button'
import { FcGoogle } from 'react-icons/fc'

import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export default function GoogleButton({ isSubmitting }) {
    const signWithGoogle = () => {
        signIn('google', {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        })
    }

    return (
        <Button
            fullWidth
            onClick={() => signWithGoogle()}
            disabled={isSubmitting}
            startIcon={<FcGoogle />}
            sx={{ mb: 2, color: '#1F1F1F', background: '#F2F2F2' }}
        >
            Sign in with Google
        </Button>
    )
}
