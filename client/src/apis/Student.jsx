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
