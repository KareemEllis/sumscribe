import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function ScribeSnackbar({ snackbarOpen, setSnackbarOpen, severity }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
    
        setSnackbarOpen(false)
    }

    return (
        <>
            {severity =='success' &&
            
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        SumScribe Completed!
                    </Alert>
                </Snackbar>
            }

            {severity=='error' &&
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        SumScribe Failed.
                    </Alert>
                </Snackbar>
            }
        </>
  
    )
}
