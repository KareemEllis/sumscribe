'use client'
import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player'

export default function LottieAnimation() {
    return (
        <Player
            autoplay
            loop
            src="https://lottie.host/85357f72-c629-4e73-9601-96a351e96bbc/wkllo3te4A.json"
            style={{ width: '400px', height: '400px' }}
            speed={0.7}
            resizeMode='cover'
        >
            <Controls visible={false} />
        </Player>
    )
}
