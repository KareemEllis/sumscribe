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
import Alert from '@mui/material/Alert'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
import DownloadIcon from '@mui/icons-material/Download'

import ScribeProgressSnackbar from '@/app/components/ScribeProgressSnackbar'
import ViewSummary from '@/app/components/ViewSummary'
import DeleteTranscription from '@/app/components/DeleteTranscription'

export default function ScribeDisplay({ data }) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')

    const [progressSnackbarOpen, setProgressSnackbarOpen] = useState(false)

    const [rateLimitAlert, setRateLimitAlert] = useState(false)

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

    const downloadTextFile = (text, fileName, fileType) => {
        const blob = new Blob([text], { type: `text/${fileType}` })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = fileName
        link.click()
    }

    const handleSummarize = async () => {
        console.log('Summarizing')
        try {
            setIsSubmitting(true)
            setProgressSnackbarOpen(true)

            const response = await fetch(`/api/summarize/${data.id}`, {
                method: 'POST'
            })
            setIsSubmitting(false)
            setProgressSnackbarOpen(false)

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
                setProgressSnackbarOpen(false)

                if (response.status == 429) {
                    setRateLimitAlert(true)
                }
            }
        } catch (error) {
            console.error('Error:', error)
            setIsSubmitting(false)
            setSnackbarOpen(true)
            setSnackbarText('Internal Server Error')
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

                    {rateLimitAlert &&
                    <Alert sx={{ mt: 2, maxWidth: 400, mx: 'auto' }} severity="info">
                        Daily limit exceeded! Try again tomorrow.
                    </Alert>
                    }
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
            
            <Box sx={{ mt: 3 }}>
                <Button 
                    size="small"
                    variant='contained' 
                    onClick={() => downloadTextFile(data.transcription, `${data.title}_transcription.txt`, 'plain')}
                    startIcon={<DownloadIcon />}
                    sx={{ mr: 2 }}
                >
                    Transcription
                </Button>

                <Button 
                    size="small"
                    variant='contained' 
                    onClick={() => downloadTextFile(data.summary, `${data.title}_summary.md`, 'markdown')}
                    startIcon={<DownloadIcon />}
                >
                    Summary
                </Button>
            </Box>

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

            <ScribeProgressSnackbar progressSnackbarOpen={progressSnackbarOpen} setSnackbarOpen={setProgressSnackbarOpen}/>
        </>
    )
}
