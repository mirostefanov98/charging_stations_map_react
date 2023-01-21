import { Box, Button, Checkbox, CircularProgress, Container, CssBaseline, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Slider } from "@mui/material";
import { Circle, MapContainer, Marker, Popup, TileLayer, Tooltip, ZoomControl } from "react-leaflet";
import { Icon, latLngBounds } from "leaflet";
import 'leaflet/dist/leaflet.css';
import defaultIconUrl from 'leaflet/dist/images/marker-icon.png';
import defaultIconShadow from 'leaflet/dist/images/marker-shadow.png';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { useFilters } from "../services/useFilters";
import { useRef, useState } from "react";
import MapChargingStationCard from "../components/MapChargingStationCard";
import { useSnackbar } from "notistack";
import "leaflet-contextmenu";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useChargingStations } from "../services/useChargingStations";

const mapCenter = {
    latitude: 42.733938,
    longitude: 25.485813
};

export default function HomePage() {
    const { enqueueSnackbar } = useSnackbar();
    const mapRef = useRef(null);
    const circleRef = useRef(null);
    const [isVisibleUserPosition, setIsVisibleUserPosition] = useState(false);
    const [circleRadius, setCircleRadius] = useState(500);
    const [isVisibleCircle, setIsvisibleCircle] = useState(false);

    const [params, setParams] = useState({
        latitude: mapCenter.latitude,
        longitude: mapCenter.longitude,
        radius: 500,
        charging_station_types: [],
        plug_types: [],
        payment_types: []
    });

    const { data: dataFilters, isLoading: isLoadingFilters } = useFilters();
    const { data: dataStations } = useChargingStations(params);

    const userPositionIcon = new Icon({
        iconUrl: defaultIconUrl,
        shadowUrl: defaultIconShadow,
        iconSize: [28, 45],
        shadowSize: [28, 45],
        iconAnchor: [14, 45],
        shadowAnchor: [9, 45],
        popupAnchor: [0, -45]
    });

    const contextmenuItems = [
        {
            text: 'Постави маркера тук',
            callback: (event) => putPositionMarkerOnМап(event)
        }
    ];

    const getUserPosition = (event) => {
        event.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setParams((prev) => ({ ...prev, latitude: position.coords.latitude, longitude: position.coords.longitude }))
                    setIsVisibleUserPosition(true);
                    mapRef.current.flyTo([position.coords.latitude, position.coords.longitude], 15);
                },
                () => {
                    enqueueSnackbar('За да използваш тази фунционалност трябва \n да разрешиш използването на местоположението от браузъра.', { variant: 'info' });
                },
                {
                    enableHighAccuracy: true
                }
            );
        } else {
            enqueueSnackbar('За да използваш тази фунционалност трябва да разрешиш използването на местоположението.', { variant: 'info' });
        }
    };

    const putPositionMarkerOnМап = (event) => {
        setParams((prev) => ({ ...prev, latitude: event.latlng.lat, longitude: event.latlng.lng }))
        setIsVisibleUserPosition(true);
        mapRef.current.flyTo([event.latlng.lat, event.latlng.lng], 15);
    };

    const filterByChargingStationType = (event) => {
        const tempArr = params.charging_station_types;
        if (event.target.checked) {
            tempArr.push(event.target.value);
        } else {
            tempArr.splice(tempArr.indexOf(event.target.value), 1);
        }
        setParams((prev) => ({ ...prev, charging_station_types: tempArr }))
    };

    const filterByPlugTypes = (event) => {
        const tempArr = params.plug_types;
        if (event.target.checked) {
            tempArr.push(event.target.value);
        } else {
            tempArr.splice(tempArr.indexOf(event.target.value), 1);
        }
        setParams((prev) => ({ ...prev, plug_types: tempArr }))
    };

    const filterByPaymentTypes = (event) => {
        const tempArr = params.payment_types;
        if (event.target.checked) {
            tempArr.push(event.target.value);
        } else {
            tempArr.splice(tempArr.indexOf(event.target.value), 1);
        }
        setParams((prev) => ({ ...prev, payment_types: tempArr }))
    };

    if (isLoadingFilters) {
        return (
            <Grid container mt={20} justifyContent='center' alignItems='center'>
                <Grid item>
                    <CircularProgress size={80} />
                </Grid>
            </Grid>
        );
    }

    return (
        <Box>
            <CssBaseline />
            <Box>
                <MapContainer
                    style={{ width: '100%', height: '65vh' }}
                    center={[mapCenter.latitude, mapCenter.longitude]}
                    zoom={7}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    ref={mapRef}
                    contextmenu={true}
                    contextmenuItems={contextmenuItems}
                    worldCopyJump={true}
                    minZoom={2}
                    maxBounds={new latLngBounds([-90, -180], [90, 180])}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <ZoomControl position="bottomright" />

                    {isVisibleCircle &&
                        <Circle ref={circleRef} center={[params.latitude, params.longitude]} radius={circleRadius * 1000} />
                    }

                    <MarkerClusterGroup
                        chunkedLoading={true}
                        removeOutsideVisibleBounds={true}
                        showCoverageOnHover={false}
                        maxClusterRadius={30}
                    >
                        {dataStations?.data?.map(station =>
                            <Marker
                                key={station.id}
                                position={[station.latitude, station.longitude]}
                                icon={new Icon({
                                    iconUrl: station.charging_station_type.image_path,
                                    shadowUrl: defaultIconShadow,
                                    iconSize: [28, 45],
                                    shadowSize: [28, 45],
                                    iconAnchor: [14, 45],
                                    shadowAnchor: [9, 45],
                                    popupAnchor: [0, -45]
                                })}
                            >
                                <Popup>
                                    <Box m={0}>
                                        <MapChargingStationCard station={station} />
                                    </Box>
                                </Popup>
                            </Marker>
                        )}
                    </MarkerClusterGroup>
                    {isVisibleUserPosition &&
                        <Marker key='userPosition' position={[params.latitude, params.longitude]} icon={userPositionIcon} zIndexOffset={9999}>
                            <Tooltip direction="top" offset={[0, -45]}>Начална позиция.</Tooltip>
                        </Marker>
                    }
                </MapContainer>
            </Box>
            <Container sx={{ mt: 5, mb: 3 }}>
                <Grid container spacing={2} justifyContent="space-around" alignItems="flex-start">
                    <Grid item xs={12} md={8} textAlign='center'>
                        <FormControl fullWidth>
                            <Slider
                                defaultValue={params.radius}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={5}
                                max={500}
                                step={5}
                                disabled={!isVisibleUserPosition}
                                onChangeCommitted={(event, value) => { setParams((prev) => ({ ...prev, radius: value })); setIsvisibleCircle(false); mapRef.current.fitBounds(circleRef.current.getBounds()); }}
                                onChange={(event, value) => { setIsvisibleCircle(true); setCircleRadius(value); }}
                            />
                            <FormHelperText>Изплозвай твоето местоположение или постави маркер на картата с десен бутон за да изпозваш филтъра за Радиус.</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4} textAlign='center'>
                        <FormControl fullWidth>
                            <Button variant="outlined" startIcon={<GpsFixedIcon />} onClick={getUserPosition}>
                                Изполвай моето местоположение
                            </Button>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormGroup>
                            <FormLabel>Тип на станцията:</FormLabel>
                            {dataFilters.data.charging_station_types.map(type =>
                                <FormControlLabel onClick={filterByChargingStationType} key={type.id} value={type.id} control={<Checkbox />} label={type.name} />
                            )}
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormGroup>
                            <FormLabel>Тип на зарядното</FormLabel>
                            {dataFilters.data.plug_types.map(type =>
                                <FormControlLabel onClick={filterByPlugTypes} key={type.id} value={type.id} control={<Checkbox />} label={type.name} />
                            )}
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormGroup>
                            <FormLabel>Начин на плащане</FormLabel>
                            {dataFilters.data.payment_types.map(type =>
                                <FormControlLabel onClick={filterByPaymentTypes} key={type.id} value={type.id} control={<Checkbox />} label={type.name} />
                            )}
                        </FormGroup>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}