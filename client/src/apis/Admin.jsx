import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const useAdminForm = () =>{
    const AdminForm = async (form)=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/admin`,{
            method: 'POST',
            body: form,
            credentials: 'include',
        })

        if(!response.ok){
            throw new Error("Failed to register admin form");
        }

        return response.json();
        }

    const {
        mutateAsync: adminForm,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: AdminForm,
    });
    
    return {
        adminForm,
        isPending,
        isError,
        isSuccess
    }
}