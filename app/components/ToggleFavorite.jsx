'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'


export default function ToggleFavorite({ transcription }) {
    const router = useRouter()

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
    
        setSnackbarOpen(false)
    }

    const handleToggleStarred = async () => {
        const newTranscriptionData = {
            // id: transcription.id,
            starred: !transcription.starred
        }

        try {
            setIsSubmitting(true)
            const response = await fetch(`/api/transcriptions/${transcription.id}`, {
                method: 'PATCH',
                body: JSON.stringify(newTranscriptionData),
            })
            setIsSubmitting(false)

            if (response.ok) {
                const result = await response.json()
                console.log(result)

                router.refresh()
                
                setSnackbarOpen(true)
                if (newTranscriptionData.starred) {
                    setSnackbarText('Added to Favorites')
                } else {
                    setSnackbarText('Removed from Favorites')
                }
                
            } 
            else {
                // Handle the error case
                const result = await response.json()
                console.log('Error:',  result.error)
                setSnackbarOpen(true)
                setSnackbarText(result.error)
            }

        } catch (error) {
            console.error('Error:', error)
            setSnackbarOpen(true)
            setSnackbarText('Failed to edit')
        }
    }
    
    return (
        <>
            <Button 
                size="small" 
                onClick={handleToggleStarred}
                disabled={isSubmitting}
                startIcon={
                    transcription.starred?
                        <StarIcon />
                        :
                        <StarOutlineIcon />
                } 
                sx={{ color: '#000' }}
            >
                Favorite
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
