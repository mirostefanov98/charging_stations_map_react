import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "./Request";

export function useUserInfo() {
    return useQuery([`/user/info`], () => apiFetch.get(`/user/info`));
}