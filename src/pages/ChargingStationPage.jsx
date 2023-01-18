import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Container, CssBaseline, Divider, Grid, IconButton, ImageList, ImageListItem, Link, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useChargingStation } from "../services/useChargingStation";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useDislike, useLike } from "../services/useLike";
import { useAuth } from "../services/useAuth";
import { useSnackbar } from "notistack";

export default function ChargingStationPage() {
    const { id } = useParams();
    const { data, isLoading, refetch } = useChargingStation(id);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const { mutate: mutateLike } = useLike(refetch);
    const { mutate: mutateDislike } = useDislike(refetch);
    const auth = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    if (isLoading) {
        return (
            <Grid container mt={20} justifyContent='center' alignItems='center'>
                <Grid item>
                    <CircularProgress size={80} />
                </Grid>
            </Grid>
        );
    }

    const station = data.data;
    const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude}%2C${station.longitude}&travelmode=driving`;

    const handleLike = (event) => {
        event.preventDefault();
        if (auth) {
            mutateLike(station.id);
        } else {
            enqueueSnackbar('Първо трябва да влезеш в профила си.', { variant: 'error' });
        }
    };

    const handleDislike = (event) => {
        event.preventDefault();
        if (auth) {
            mutateDislike(station.id);
        } else {
            enqueueSnackbar('Първо трябва да влезеш в профила си.', { variant: 'error' });
        }
    };

    return (
        <Container component="main">
            <CssBaseline />
            <Box sx={{ mt: 3 }} mx={{ xs: 0, md: 5 }}>
                <Card sx={{ backgroundColor: '#f5f5f5' }}>
                    <CardHeader
                        avatar={
                            <img
                                src={station.charging_station_type.image_path}
                                alt={station.charging_station_type.name}
                                width='30px'
                            />
                        }
                        title={station.name}
                        titleTypographyProps={{ variant: 'h4' }}
                        subheader={`Работно време: ${station.working_time}`}
                        subheaderTypographyProps={{ fontSize: 11 }}
                    />
                    <CardContent sx={{ py: 0 }}>
                        <ImageList sx={{ width: '100%', height: 205 }} cols={matches ? 1 : 5}>
                            {station.images.map((image, key) => (
                                <Link href={image} target="_blank">
                                    <ImageListItem key={key}>
                                        <img
                                            src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt={key}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                </Link>
                            ))}
                        </ImageList>
                    </CardContent>
                    <CardActions>
                        <Stack spacing={1} direction='row' alignItems="center" ml={1}>
                            <IconButton
                                onClick={handleLike}
                            >
                                <ThumbUpIcon color="success" />
                            </IconButton>
                            <Typography variant="h6" component="span">
                                {station.likes}
                            </Typography>
                            <IconButton
                                onClick={handleDislike}
                            >
                                <ThumbDownIcon color="error" />
                            </IconButton>
                            <Typography variant="h6" component="span">
                                {station.dislikes}
                            </Typography>
                            <Link href={googleUrl} target="_blank" underline="none">
                                <Button>Навигирай до зарядната станция</Button>
                            </Link>
                        </Stack>
                    </CardActions>
                    <CardContent>
                        <Grid container spacing={2} justifyContent="space-evenly" alignItems="flex-start">
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                        Типове контакти:
                                    </Typography>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {station.plug_types.map((plug) => (
                                            <>
                                                <ListItem key={plug.id}>
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt={plug.name}
                                                            src={plug.image_path}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={plug.name} secondary={'Мощност: ' + plug.power + ' kW'} />
                                                </ListItem>
                                                <Divider variant="inset" component="li" />
                                            </>
                                        ))}
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                        Типове на плащане:
                                    </Typography>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {station.payment_types.map((payment) => (
                                            <>
                                                <ListItem key={payment.id}>
                                                    <ListItemText primary={payment.name} />
                                                </ListItem>
                                                <Divider component="li" />
                                            </>
                                        ))}
                                    </List>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                        Описание:
                                    </Typography>
                                    <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
                                        <Typography variant="body1" gutterBottom>
                                            {station.description}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}