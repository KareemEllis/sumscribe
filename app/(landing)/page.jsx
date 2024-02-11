import Container from '@mui/material/Container'
import Navbar from './Navbar'
import Hero from './Hero'
import Features from './Features'
import CallToAction from './CallToAction'
import Footer from './Footer'

export default function Home() {
    return (
        <main>
            <Navbar />

            <Container component="div" maxWidth="lg">
                <Hero />
                <Features />
                <CallToAction />
            </Container>

            <Footer />
        </main>
        
    )
}
