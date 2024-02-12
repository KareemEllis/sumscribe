import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { Rubik } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

//export const dynamic = 'force-dynamic'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
    title: 'Sumscribe',
    description: 'SumScribe is a cutting-edge web application designed to streamline your workflow by converting audio files into accurate transcriptions and concise summaries using Artificial Intelligence. Perfect for professionals, students, and anyone looking to maximize productivity, SumScribe offers fast, reliable, and easy-to-understand text versions of your audio content. Whether it\'s lectures, meetings, interviews, or podcasts, SumScribe helps you capture and condense the information you need, saving you time and enhancing your understanding with AI.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-color-mode="light">
            <body className={rubik.className}>
                <AppRouterCacheProvider> {/*Required for MaterialUI*/}
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>  
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
