import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EvStationRoundedIcon from '@mui/icons-material/EvStationRounded';
import { useRegister } from '../services/useRegister';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const { mutate: mutateRegister, isError, error } = useRegister();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        mutateRegister(formData);
    };

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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <EvStationRoundedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Създай нов профил
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Име и Фамилия"
                                autoFocus
                                error={(isError && error.response.data.errors) && (error.response.data.errors.name ? true : false)}
                                helperText={(isError && error.response.data.errors) && error.response.data.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Емейл"
                                name="email"
                                autoComplete="email"
                                error={(isError && error.response.data.errors) && (error.response.data.errors.email ? true : false)}
                                helperText={(isError && error.response.data.errors) && error.response.data.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Парола"
                                type="password"
                                id="password"
                                autoComplete="password"
                                error={(isError && error.response.data.errors) && (error.response.data.errors.password ? true : false)}
                                helperText={(isError && error.response.data.errors) && error.response.data.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password_confirmation"
                                label="Потвърди парола"
                                type="password"
                                id="password_confirmation"
                                error={(isError && error.response.data.errors) && (error.response.data.errors.password_confirmation ? true : false)}
                                helperText={(isError && error.response.data.errors) && error.response.data.errors.password_confirmation}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Регистарция
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                underline="none"
                                component="button"
                                variant="body2"
                                onClick={() => navigate('/login')}
                            >
                                Вече имаш акаунт? Вход
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}