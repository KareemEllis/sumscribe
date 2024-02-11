'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import Box from '@mui/material/Box'
import InfoIcon from '@mui/icons-material/Info'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'

import DeleteTranscription from '@/app/components/DeleteTranscription'
import MarkdownEditor from './MarkdownEditor'
import ViewSummary from '@/app/components/ViewSummary'

export default function EditTranscriptionForm({ transcription }) {
    const router = useRouter()

    const [title, setTitle] = useState(transcription.title)
    const [transcriptionText, setTranscriptionText] = useState(transcription.transcription)
    const [summary, setSummary] = useState(transcription.summary)
    const [starred, setStarred] = useState(transcription.starred)

    const [errors, setErrors] = useState({
        title: { error: false, text: '' },
        transcriptionText: { error: false, text: '' },
        summary: { error: false, text: '' }
    })

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

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


    const checkErrors = async () => {
        let numErrors = 0

        await setErrors({
            title: { error: false, text: '' },
            transcriptionText: { error: false, text: '' },
            summary: { error: false, text: '' }
        })

        // Check if Email Entered
        if (title.trim() === '') {
            await setErrors(prevErrors => ({
                ...prevErrors,
                title: {
                    error: true,
                    text: 'Title Required'
                }
            }))
            numErrors += 1
        } 

        return numErrors

    }

    const handleSubmit = async () => {
        //Check Errors
        const numErrors = await checkErrors()

        if (numErrors > 0) {
            return
        }

        console.log('Editing')
        const newTranscriptionData = {
            ...transcription,
            title: title.trim(), 
            transcription: transcriptionText,
            summary,
            starred
        }
        console.log(newTranscriptionData)

        try {
            setIsSubmitting(true)
            console.log('Fetching')
            const response = await fetch(`/api/transcriptions/${transcription.id}`, {
                method: 'PATCH',
                body: JSON.stringify(newTranscriptionData),
            })

            setIsSubmitting(false)

            if (response.ok) {
                const result = await response.json()
                console.log(result)
                router.push(`/scribes/${transcription.id}`)
                router.refresh()
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
            setSnackbarText('Edit Failed')
        }
    }

    const handleSummarize = async () => {
        console.log('Summarizing')
        try {
            setIsSubmitting(true)
            const response = await fetch(`/api/summarize/${transcription.id}`, {
                method: 'POST'
            })
            setIsSubmitting(false)

            if (response.ok) {
                const result = await response.json()
                console.log(result)
                setSnackbarOpen(true)
                setSnackbarText('Summarization Complete!')
                router.push(`/scribes/${transcription.id}`)
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
            {/* Title Text Field */}
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title.error}
                label="Title"
                helperText={errors.title.text}
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
            />
            
            <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Transcription" />
                <Tab label="Summary" />
            </Tabs>

            <Box sx={{ mb: 3 }}>
                {/* Tab for Transcription Text Field */}
                {selectedTab == 0 &&
                <TextField
                    value={transcriptionText}
                    onChange={(e) => setTranscriptionText(e.target.value)}
                    error={errors.transcriptionText.error}
                    helperText={errors.transcriptionText.text}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={15}
                    
                />
                }

                {/* Tab for Summary Text Field */}
                {selectedTab == 1 && transcription.summary &&
                // <TextField
                //     value={summary}
                //     onChange={(e) => setSummary(e.target.value)}
                //     error={errors.summary.error}
                //     helperText={errors.summary.text}
                //     variant="outlined"
                //     fullWidth
                //     multiline
                //     rows={15}
                // />
                <div>
                    <MarkdownEditor summary={summary} setSummary={setSummary} />
                </div>
                }


                {/* No Summary created yet */}
                {selectedTab == 1 && !transcription.summary &&
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
            


            <Box sx={{ mb: 2 }}>
                <Button 
                    size="small" 
                    onClick={() => setStarred(prevStarred => !prevStarred)}
                    disabled={isSubmitting}
                    startIcon={
                        starred?
                            <StarIcon />
                            :
                            <StarOutlineIcon />
                    } 
                    sx={{ color: '#000' }}
                >
                Favorite
                </Button>
            </Box>

            <Button 
                variant="contained" 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                sx={{ mr: 2 }}
            >
                Update
            </Button>
            <DeleteTranscription id={transcription.id} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />



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
