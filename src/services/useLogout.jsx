import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./Request";

export function useLogout() {
    const navigate = useNavigate();
    return useMutation(
        () => apiFetch.post(`/auth/logout`),
        {
            onSuccess: (response) => {
                localStorage.removeItem('token');
                localStorage.removeItem('isAdmin');

                navigate("/");
            }
        }
    );
}