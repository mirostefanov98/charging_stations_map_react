import { Box, Container, CssBaseline, Typography } from "@mui/material";

export default function HomePage() {

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Карта
                </Typography>
            </Box>
        </Container>
    );
}