'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import ScribeSnackbar from './ScribeSnackbar'
import ScribeProgressModal from './ScribeProgressModal'
import ScribeProgressSnackbar from './ScribeProgressSnackbar'

import ReactAudioPlayer from 'react-audio-player'

export default function CreateScribe() { 
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [titleErrorText, setTitleErrorText] = useState('')

    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedFileError, setSelectedFileError] = useState(false)
    const [selectedFileErrorText, setSelectedFileErrorText] = useState('')
  
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')
   
    const [modalOpen, setModalOpen] = useState(false)
    const [progressSnackbarOpen, setProgressSnackbarOpen] = useState(false)

    const checkErrors = async () => {
        let numErrors = 0

        // Check if Title Field is empty
        if (title.trim() == '') {
            numErrors+=1
            setTitleError(true)
            setTitleErrorText('Title Required')
        }
        // Check if Audio File is selected
        if(!selectedFile) {
            numErrors+=1
            setSelectedFileError(true)
            setSelectedFileErrorText('Audio File Required')
        }
        // Check if audio file is under 25MB
        else if (selectedFile.size > 25 * 1024 * 1024) {
            numErrors+=1
            setSelectedFileError(true)
            setSelectedFileErrorText('Please upload an audio file less than 25MB')
        }
        // Check if the file is an audio file with allowed types
        else if (!/^audio\/(mp3|mp4|mpeg|mpga|m4a|wav)$/.test(selectedFile.type)) {
            numErrors+=1
            setSelectedFileError(true)
            setSelectedFileErrorText('Please upload a valid audio file (mp3, mp4, mpeg, mpga, m4a, wav)')
        }

        return numErrors
    }

    const handleSubmit = async () => {
        await setTitleError(false)
        await setTitleErrorText('')
        await setSelectedFileError(false)
        await setSelectedFileErrorText('')

        console.log(`Title: ${title}`)
        console.log(selectedFile)

        const numErrors = await checkErrors()

        if(numErrors > 0) {
            return
        }

        try {
            // Create a FormData object to send the title and selectedAudio
            const formData = new FormData()
            formData.append('title', title)
            formData.append('file', selectedFile)
            setIsSubmitting(true)
            setModalOpen(true)
            console.log(formData)
              
            // Send the POST request
            const response = await fetch('/api/transcriptions', {
                method: 'POST',
                body: formData,
            })
    
            setIsSubmitting(false)
            setModalOpen(false)
            setProgressSnackbarOpen(false)
            setProgressSnackbarOpen(false)

            if (response.ok) {
                const result = await response.json()
                console.log(result)
                router.push(`/scribes/${result.id}`)
                router.refresh()
                setSnackbarOpen(true)
                setSnackbarSeverity('success')
            } 
            else {
                // Handle the error case
                console.error('Error:', response.status, response.error)
                setSnackbarOpen(true)
                setSnackbarSeverity('error')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleModalClose = () => {
        setModalOpen(false)
        setProgressSnackbarOpen(true)
    }
    
    return (
        <Container component='main' maxWidth="lg">
            
            <Typography variant="h5" fontWeight='bold'>
                Create new Scribe
            </Typography>

            <TextField 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={titleError}
                id="title" 
                label="Title" 
                variant="filled" 
                sx={{maxWidth: '500px', width: '100%', marginTop: 4 }}
            />
            {titleError &&
                <Typography variant='body2' color='error' sx={{ mt: 1, ml: 2, fontSize: 13 }}>
                    {titleErrorText}
                </Typography>
            }
            

            <Input
                type="file"
                inputProps={{ accept: 'audio/*' }}
                onChange={(event) => setSelectedFile(event.target.files[0])}
                error={selectedFileError}
                sx={{ display: 'block', maxWidth: '500px', marginTop: 4 }}
            />
            {selectedFileError &&
                <Typography variant='body2' color='error' sx={{ mt: 1, ml: 2, fontSize: 13 }}>
                    {selectedFileErrorText}
                </Typography>
            }


            {selectedFile && (

                <ReactAudioPlayer
                    src={URL.createObjectURL(selectedFile)}
                    controls
                    style={{ marginTop: '35px' }}
                />
            )}

            <Button 
                variant="contained"
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
                sx={{ marginTop: 4 }}
            >
                Transcribe
            </Button>


            {modalOpen &&
                <ScribeProgressModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
            }
            <ScribeProgressSnackbar progressSnackbarOpen={progressSnackbarOpen} setSnackbarOpen={setProgressSnackbarOpen}/>
            <ScribeSnackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} severity={snackbarSeverity} />
        </Container>
    )
}
