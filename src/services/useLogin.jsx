import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./Request";

export function useLogin() {
    const navigate = useNavigate();
    return useMutation(
        (formData) => apiFetch.post(`/auth/login`, formData),
        {
            onSuccess: (response) => {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('isAdmin', JSON.stringify(response.data.is_admin));

                navigate("/");
            }
        }
    );
}