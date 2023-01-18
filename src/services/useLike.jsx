import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { apiFetch } from "./Request";

export function useLike(refetch) {
    const { enqueueSnackbar } = useSnackbar();

    return useMutation(
        (id) => apiFetch.post(`/station/like`, {
            charging_station_id: id
        }),
        {
            onSuccess: (response) => {
                if (response.data.status === true) {
                    enqueueSnackbar('Вие добавихте положителна оценка.', { variant: 'success' });
                } else {
                    enqueueSnackbar('Вие премахнахте положителна оценка.', { variant: 'info' });
                }

                refetch();
            }
        }
    );
}

export function useDislike(refetch) {
    const { enqueueSnackbar } = useSnackbar();

    return useMutation(
        (id) => apiFetch.post(`/station/dislike`, {
            charging_station_id: id
        }),
        {
            onSuccess: (response) => {
                if (response.data.status === true) {
                    enqueueSnackbar('Вие добавихте отрицателна оценка.', { variant: 'error' });
                } else {
                    enqueueSnackbar('Вие премахнахте отрицателна оценка.', { variant: 'info' });
                }

                refetch();
            }
        }
    );
}