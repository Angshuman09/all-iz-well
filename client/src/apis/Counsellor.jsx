import { useQuery } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const useGetCounsellor = () => {
    const GetCounsellor = async () => {
        const response = await fetch(`${API_BASE_URL}/api/v1/counsellor`, {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) throw new Error("Failed to get counsellor");

        return response.json();
    }

    const {
        data: getCounsellor,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["getCounsellor"],
        queryFn: GetCounsellor,
    });

    return {
        getCounsellor,
        isLoading,
        isError,
        isSuccess,
        refetch
    };
}

export const useGetCriticalStudents = () => {
    const GetCriticalStudents = async () => {
        const response = await fetch(`${API_BASE_URL}/api/v1/counsellor/critical-students`, {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) throw new Error("Failed to get critical students");

        return response.json();
    }

    const {
        data: getCriticalStudents,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["getCriticalStudents"],
        queryFn: GetCriticalStudents,
    });

    return {
        getCriticalStudents,
        isLoading,
        isError,
        isSuccess,
        refetch
    };
}
