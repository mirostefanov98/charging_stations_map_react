import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./Request";

export function useFilters() {
    return useQuery([`/station/filters`], () => apiFetch.get(`/station/filters`));
}