import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./Request";

export function useChargingStations(params) {
    console.log(params);
    return useQuery([`/station/get`, params], () => apiFetch.get(`/station/get`,
        { params }
    ));
}