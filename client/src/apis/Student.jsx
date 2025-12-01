import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const useStudentForm = ()=>{
    const studentForm = async (user)=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/student`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            credentials: 'include',
        })

        if(!response.ok){
            throw new Error("Failed to register student form");
        }

        return response.json();
    }

    const {
        mutateAsync: studentform,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: studentForm,
    });
    
    return {
        studentform,
        isPending,
        isError,
        isSuccess
    }
}

// student dashboard

export const useSetStudentMood = ()=>{
    const SetStudentMood = async (mood)=>{
        const response = await fetch(`${API_BASE_URL}api/v1/features/mood`,{
             method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mood),
            credentials: 'include',
        })

        if(!response.ok){
            throw new Error("Failed to register student form");
        }

        return response.json();
    }

    const {
        mutateAsync: studentMood,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: SetStudentMood,
    });
    
    return {
        studentMood,
        isPending,
        isError,
        isSuccess
    }
}

export const useGetStudentData = ()=>{
    const GetStudentData = async ()=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/student`,{
            method:"GET",
            credentials:"include"
        })

        if(!response.ok) throw new Error("error in fetching student data");

        return response.json();
    }

      const {
        data: studentData,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["studentData"],
        queryFn: GetStudentData,
    });

    return {
        studentData,
        isLoading,
        isError,
        isSuccess,
        refetch
    };
}