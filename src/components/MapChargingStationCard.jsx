import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function ChargingStationCard({ station }) {
    const navigate = useNavigate();

    return (
        <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardMedia
                sx={{ height: 100 }}
                image={station.images[0]}
                title="stationImage"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {station.name}
                </Typography>
                <Typography variant="p" component="div">
                    Работно време: {station.working_time}
                </Typography>
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
                        variant="outlined"
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