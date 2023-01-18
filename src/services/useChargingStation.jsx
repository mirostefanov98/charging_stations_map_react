import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./Request";

export function useChargingStation(id) {
    const navigate = useNavigate();

    return useQuery([`/station`], () => apiFetch.get(`/station/${id}`),
        {
            retry: false,

            onError: () => {
                navigate("/");
            }
        }
    );
}