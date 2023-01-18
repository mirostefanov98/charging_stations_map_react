import { Box, CircularProgress, Container, CssBaseline, Grid, Typography } from "@mui/material";
import ChargingStationCard from "../components/ChargingStationCard";
import { useUserStations } from "../services/useUserStaions";

export default function UserStationsPage() {
    const { data, isLoading } = useUserStations();

    if (isLoading) {
        return (
            <Grid container mt={20} justifyContent='center' alignItems='center'>
                <Grid item>
                    <CircularProgress size={80} />
                </Grid>
            </Grid>
        );
    }

    return (
        <Container component="main">
            <CssBaseline />
            <Box sx={{ mt: 5 }}>
                <Typography component="h1" variant="h5" textAlign='center'>
                    Моите зарядни станции
                </Typography>
            </Box>
            <Box sx={{ mt: 3 }} mx={{ xs: 0, md: 5 }}>
                <Grid container spacing={5} justifyContent="flex-start" alignItems="center">
                    {data.data.map(station =>
                        <Grid item xs={12} md={4} key={station.id}>
                            <ChargingStationCard station={station} />
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    );
}