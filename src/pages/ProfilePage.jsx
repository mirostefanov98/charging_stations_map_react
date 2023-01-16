import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useChangePassword } from '../services/useChangePassword';
import { useUserInfo } from '../services/useUserInfo';
import { CircularProgress } from '@mui/material';

export default function ProfilePage() {
    const { data, isLoading } = useUserInfo();
    const { mutate: mutateChangePassword, isError, error } = useChangePassword();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        mutateChangePassword(formData);
    };

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
        <Container component="main" >
            <CssBaseline />
            <Grid container sx={{ mt: 3 }} spacing={2} justifyContent="space-evenly">
                <Grid item xs={12} md={5}>
                    <Grid container direction='column' alignItems="center">
                        <Grid item xs={12}>
                            <Avatar sx={{ m: 1, p: 5, bgcolor: 'success.main' }}>
                                <AccountCircleRoundedIcon fontSize='large' />
                            </Avatar>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                Моят профил
                            </Typography>
                        </Grid>
                        <Grid item xs={12} alignSelf="flex-start">
                            <Typography sx={{ mt: 5 }} component="h1" variant="h5">
                                <Box fontWeight='700' display='inline'>Име и Фамилия: </Box>
                                {data.data.user.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} alignSelf="flex-start">
                            <Typography sx={{ mt: 5 }} component="h1" variant="h5">
                                <Box fontWeight='700' display='inline'>Емейл: </Box>
                                {data.data.user.email}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography mt={{ xs: 5, md: 0 }} component="h1" variant="h5">
                            Смяна на парола
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="old_password"
                                        label="Стара парола"
                                        type="password"
                                        id="old_password"
                                        error={(isError && error.response.data.errors) && (error.response.data.errors.old_password ? true : false)}
                                        helperText={(isError && error.response.data.errors) && error.response.data.errors.old_password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="new_password"
                                        label="Нова парола"
                                        type="password"
                                        id="new_password"
                                        error={(isError && error.response.data.errors) && (error.response.data.errors.new_password ? true : false)}
                                        helperText={(isError && error.response.data.errors) && error.response.data.errors.new_password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="new_password_confirmation"
                                        label="Потвърди нова парола"
                                        type="password"
                                        id="new_password_confirmation"
                                        error={(isError && error.response.data.errors) && (error.response.data.errors.new_password_confirmation ? true : false)}
                                        helperText={(isError && error.response.data.errors) && error.response.data.errors.new_password_confirmation}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Смени парола
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}