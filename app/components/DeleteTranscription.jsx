'use client'
import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { useRouter } from 'next/navigation'

export default function DeleteTranscription({ id, isSubmitting, setIsSubmitting }) {
    const router = useRouter()
    
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
    
        setSnackbarOpen(false)
    }

    const handleDelete = async () => {
        console.log('Deleting Transcription ', id)
        try {
            setIsSubmitting(true)
            const response = await fetch(`/api/transcriptions/${id}`, {
                method: 'DELETE'
            })
            setIsSubmitting(false)

            if (response.ok) {
                const result = await response.json()
                console.log(result)
                router.push('/scribes')
                router.refresh()
            } 
            else {
                // Handle the error case
                const result = await response.json()
                console.error('Error:',  result.error)
                setSnackbarOpen(true)
                setSnackbarText(result.error)
            }
        } catch (error) {
            console.log(error)
            setSnackbarOpen(true)
            setSnackbarText('Internal Server Error')
        }
    }

    return (
        <>
            <Button variant="contained" onClick={handleDelete} disabled={isSubmitting}>
            Delete
            </Button>
        
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarText}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleSnackbarClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />

        </>
       
    )
}
