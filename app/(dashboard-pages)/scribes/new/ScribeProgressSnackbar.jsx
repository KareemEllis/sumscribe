import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

export default function ScribeProgressSnackbar({ progressSnackbarOpen, setSnackbarOpen }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
    
        setSnackbarOpen(false)
    }

    const snackMessage = (
        <>
            <CircularProgress size={'15px'} sx={{ mr: 1 }} /> Working on audio file
        </>
    )

    const action = (
        <IconButton
            size="small"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    )

    return (
        <Snackbar
            open={progressSnackbarOpen}
            onClose={handleClose}
            message={snackMessage}
            action={action}
        />
    )
}
