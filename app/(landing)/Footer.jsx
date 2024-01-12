import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export default function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                height: 'auto',
                // backgroundColor: 'secondary.main',
                backgroundColor: '#f7f7f7',
                marginTop: '100px',
                paddingTop: '1rem',
                paddingBottom: '1rem',
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        LOGO
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                            {`© ${new Date().getFullYear()} SumScribe`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
