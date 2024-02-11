'use client'
import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function loading() {
  return (
    <Box sx={{ mt:5 }}>
        <Player
            autoplay
            loop
            src="https://lottie.host/85357f72-c629-4e73-9601-96a351e96bbc/wkllo3te4A.json"
            style={{ width: '100px', height: '100px' }}
            speed={0.7}
            resizeMode='cover'
        >
            <Controls visible={false} />
        </Player>

        <Typography variant="h6" textAlign={'center'} gutterBottom>
            loading...
      </Typography>
    </Box>
  )
}
