'use client'
import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player'

export default function LottieAnimation() {
    return (
        <Player
            autoplay
            loop
            src="https://lottie.host/e2dc2ca2-57cc-4105-a903-022f6304e57f/BEIhYJ4kZ9.json"
            style={{ width: '400px', height: '400px' }}
            speed={0.7}
            resizeMode='cover'
        >
            <Controls visible={false} />
        </Player>
    )
}
