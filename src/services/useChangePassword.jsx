import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { apiFetch } from "./Request";

export function useChangePassword() {
    const { enqueueSnackbar } = useSnackbar();

    return useMutation(
        (formData) => apiFetch.post(`/user/change-password`, formData),
        {
            onSuccess: () => {
                enqueueSnackbar('Паролата е променена успешно.', { variant: 'success' });
            }
        }
    );
}