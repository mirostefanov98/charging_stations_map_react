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
import { useLogin } from '../services/useLogin';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { mutate: mutateLogin, isError, error } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        mutateLogin(formData);
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
                    Вход
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Емейл"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={(isError && error.response.data.errors) && (error.response.data.errors.email ? true : false)}
                        helperText={(isError && error.response.data.errors) && error.response.data.errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Парола"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={(isError && error.response.data.errors) && (error.response.data.errors.password ? true : false)}
                        helperText={(isError && error.response.data.errors) && error.response.data.errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Влизане
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => navigate('/register')}
                            >
                                Нямаш акаунт? Регистрирай се
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}