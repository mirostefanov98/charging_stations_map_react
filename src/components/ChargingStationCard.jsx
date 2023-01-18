import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function ChargingStationCard({ station }) {
    const navigate = useNavigate();

    return (
        <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardHeader
                sx={{ fontSize: '12px' }}
                avatar={station.publish ? <CircleIcon color="success" fontSize="small" /> : <CircleIcon color="error" fontSize="small" />}
                title={station.publish ? "Потвърдена" : "Неподвърдена"}
                subheader={station.publish ? "Станцията е видима на картата" : "Изчаква се одобрение от администратор"}
                subheaderTypographyProps={{ fontSize: 11 }}
            />
            <CardMedia
                sx={{ height: 200 }}
                image={station.images[0]}
                title="stationImage"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {station.name}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="p" component="div">
                        Тип на станцията: {station.charging_station_type.name}
                    </Typography>
                    <img
                        src={station.charging_station_type.image_path}
                        alt={station.charging_station_type.name}
                        width='20px'
                    />
                </Stack>
            </CardContent>
            <CardActions>
                <Stack width='100%' direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Stack direction="row" alignItems='center' spacing={1}>
                        <ThumbUpIcon color="success" />
                        <Typography variant="p" component="span">
                            {station.likes}
                        </Typography>
                        <ThumbDownIcon color="error" />
                        <Typography variant="p" component="span">
                            {station.dislikes}
                        </Typography>
                    </Stack>
                    <Button
                        size="small"
                        onClick={() => navigate(`/station/${station.id}`)}
                    >
                        Виж още
                    </Button>
                </Stack>
            </CardActions>
        </Card>
    );
}