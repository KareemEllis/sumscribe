import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'
  
export default function ScribeProgressModal({ modalOpen, handleModalClose }) {

    return (
        <>

            <Dialog
                open={modalOpen}
                keepMounted
                onClose={handleModalClose}
            >
                <DialogTitle>{'Please Wait...'}</DialogTitle>
                <DialogContent sx={{ paddingX:5, marginY:2 }}>
                    <DialogContentText>
                        <CircularProgress size='20px' sx={{mr:1}}/> Working on audio file
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
