import Image from 'next/image'
import Container from '@mui/material/Container'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'

export default function Home() {
    return (
        <main>
            <Navbar />

            <Container component="div" maxWidth="lg">
                <Hero />
                <Features />
            </Container>

            <Footer />
        </main>
        
    )
}
