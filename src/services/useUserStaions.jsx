import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./Request";

export function useUserStations() {
    return useQuery([`/user/stations`], () => apiFetch.get(`/user/stations`));
}