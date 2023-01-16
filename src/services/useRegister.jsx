import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./Request";

export function useRegister() {
    const navigate = useNavigate();
    return useMutation(
        (formData) => apiFetch.post(`/auth/register`, formData),
        {
            onSuccess: (response) => {
                localStorage.setItem('token', JSON.stringify(response.data.token));

                navigate("/");
            }
        }
    );
}