'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import InfoIcon from '@mui/icons-material/Info'
import Button from '@mui/material/Button'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'

import ViewSummary from '@/app/components/ViewSummary'
import DeleteTranscription from '@/app/components/DeleteTranscription'

export default function ScribeDisplay({ data }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')

    const [selectedTab, setSelectedTab] = useState(0)
    const handleTabChange = (event, newTab) => {
        setSelectedTab(newTab)
    }
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
    
        setSnackbarOpen(false)
    }


    const handleSummarize = async () => {
        console.log('Summarizing')
        try {
            setIsSubmitting(true)
            const response = await fetch(`/api/summarize/${data.id}`, {
                method: 'POST'
            })
            setIsSubmitting(false)

            if (response.ok) {
                const result = await response.json()
                console.log(result)
                setSnackbarOpen(true)
                setSnackbarText('Summarization Complete!')
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
            console.error('Error:', error)
            setIsSubmitting(false)
            setSnackbarOpen(true)
            setSnackbarText('Summarization Failed')
        }
        
    }

    return (
        <>
            <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 2 }}>
                <Tab label="Transcription" />
                <Tab label="Summary" />
            </Tabs>

            <Box sx={{ mb: 3 }}>
                {/* Tab for Transcription Text Field */}
                {selectedTab == 0 &&
                    <Typography variant="body1" gutterBottom>
                        {data.transcription}
                    </Typography>
                }

                {/* Tab for Summary Text Field */}
                {selectedTab == 1 && data.summary &&
                // <Typography variant="body1" gutterBottom>
                //     {data.summary}
                // </Typography>
                <ViewSummary summary={data.summary} />
                }
                {/* No Summary created yet */}
                {selectedTab == 1 && !data.summary &&
                <Box textAlign='center' width='100%' mt={8} mb={8}>
                    <InfoIcon sx={{ fontSize: 50 }}/>
                    <Typography variant='h4' fontWeight='bold' mb={3}>
                        Transcription not summarized yet!
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={handleSummarize} 
                        disabled={isSubmitting}
                    >
                        Summarize
                    </Button>
                </Box>
                }

            </Box>

            <Box sx={{ display: 'flex', mb: 2 }}>
                {data.starred ?
                    <>
                        <StarIcon sx={{ mr: 1 }} /> <Typography variant='body1'>Favorited</Typography>
                    </>
                    :
                    <>
                        <StarOutlineIcon sx={{ mr: 1 }} /> <Typography variant='body1'>Not Favorited</Typography>
                    </>
                }
            </Box>

            <Button variant="contained" sx={{ mr: 2 }} disabled={isSubmitting}>
                <Link href={`/scribes/edit/${data.id}`}>Edit</Link>
            </Button>
            <DeleteTranscription id={data.id} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting}/>
            


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
