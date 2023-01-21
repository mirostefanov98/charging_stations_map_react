import { Box, Button, Checkbox, CircularProgress, Container, CssBaseline, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useCreateStation } from "../services/useCreateStation";
import { useFilters } from "../services/useFilters";
import { UploadFile } from "@mui/icons-material";
import { useRef } from "react";

export default function CreateStationPage() {
    const { data, isLoading } = useFilters();
    const { mutate: mutateCreateStation, isError, error } = useCreateStation();
    const imagesRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        mutateCreateStation(formData);
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
        <Container component="main">
            <CssBaseline />
            <Box sx={{ mt: 5 }}>
                <Typography component="h1" variant="h5" textAlign='center'>
                    Добави нова зарядна станция
                </Typography>
            </Box>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2} justifyContent="space-evenly" alignItems="flex-start">
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="name"
                            fullWidth
                            id="name"
                            label="Име на станцията"
                            autoFocus
                            error={(isError && error.response.data.errors) && (error.response.data.errors.name ? true : false)}
                            helperText={(isError && error.response.data.errors) && error.response.data.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="working_time"
                            fullWidth
                            id="working_time"
                            label="Работно време"
                            autoFocus
                            error={(isError && error.response.data.errors) && (error.response.data.errors.working_time ? true : false)}
                            helperText={(isError && error.response.data.errors) && error.response.data.errors.working_time}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="latitude"
                            type="number"
                            fullWidth
                            id="latitude"
                            label="Географска ширина"
                            autoFocus
                            error={(isError && error.response.data.errors) && (error.response.data.errors.latitude ? true : false)}
                            helperText={(isError && error.response.data.errors) && error.response.data.errors.latitude}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="longitude"
                            type="number"
                            fullWidth
                            id="longitude"
                            label="Географска дължина"
                            autoFocus
                            error={(isError && error.response.data.errors) && (error.response.data.errors.longitude ? true : false)}
                            helperText={(isError && error.response.data.errors) && error.response.data.errors.longitude}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="description"
                            multiline
                            fullWidth
                            id="description"
                            label="Описание"
                            autoFocus
                            error={(isError && error.response.data.errors) && (error.response.data.errors.description ? true : false)}
                            helperText={(isError && error.response.data.errors) && error.response.data.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="charging_station_type_id_label">Тип на станцията</InputLabel>
                            <Select
                                labelId="charging_station_type_id_label"
                                id="charging_station_type_id"
                                label="Тип на станцията"
                                name="charging_station_type_id"
                                defaultValue={''}
                            >
                                {data.data.charging_station_types.map(type =>
                                    <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                )}
                            </Select>
                            {(isError && error.response.data.errors) && (error.response.data.errors.charging_station_type_id ? true : false) &&
                                <FormHelperText sx={{ color: 'error.main' }}>{error.response.data.errors.charging_station_type_id}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign="center" mt={3}>
                        <FormGroup>
                            <FormLabel>Тип на зарядното</FormLabel>
                            {(isError && error.response.data.errors) && (error.response.data.errors.plug_types ? true : false) &&
                                <FormHelperText sx={{ color: 'error.main' }}>{error.response.data.errors.plug_types}</FormHelperText>
                            }
                            {data.data.plug_types.map(type =>
                                <FormControlLabel name="plug_types[]" key={type.id} value={type.id} control={<Checkbox />} label={type.name} />
                            )}
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign="center" mt={3}>
                        <FormGroup>
                            <FormLabel>Начин на плащане</FormLabel>
                            {(isError && error.response.data.errors) && (error.response.data.errors.payment_types ? true : false) &&
                                <FormHelperText sx={{ color: 'error.main' }}>{error.response.data.errors.payment_types}</FormHelperText>
                            }
                            {data.data.payment_types.map(type =>
                                <FormControlLabel name="payment_types[]" key={type.id} value={type.id} control={<Checkbox />} label={type.name} />
                            )}
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign="center" alignSelf='center'>
                        <FormControl >
                            <Button variant="outlined" component="label" endIcon={<UploadFile />}>
                                Прикачи снимки
                                <input
                                    name="images[]"
                                    type='file'
                                    multiple
                                    id="images"
                                    label="Качи снимки"
                                    accept="image/*"
                                    hidden
                                    ref={imagesRef}
                                />
                            </Button>
                            {(imagesRef.current && (imagesRef.current.files.length > 0)) &&
                                <FormHelperText sx={{ color: 'primary.main' }}>Прикачени снимки: {imagesRef.current.files.length}</FormHelperText>
                            }
                            {(isError && error.response.data.errors) && (error.response.data.errors.images ? true : false) &&
                                <FormHelperText sx={{ color: 'error.main' }}>{error.response.data.errors.images}</FormHelperText>
                            }
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mb: 5 }}
                        >
                            Добави
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}