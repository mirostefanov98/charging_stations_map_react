import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./Request";

export function useCreateStation() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();


    return useMutation(
        (formData) => apiFetch.post(`/station/create`, formData),
        {
            onSuccess: () => {
                enqueueSnackbar('Станцията е добавена успешно.', { variant: 'success' });
                enqueueSnackbar('Станцията ще бъде видима след одобрение от администратор.', { variant: 'info' });

                navigate('/user-stations');
            }

        }
    );
}