import {useMutation} from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';



export const useCreateMyUser = () => {
    const createMyUserRequest = async (user)=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Error creating user');
        }

        return response.json();
    }

     const {
        mutateAsync: createMyUser,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: createMyUserRequest,
    });

    return {
        createMyUser,
        isPending,
        isError,
        isSuccess
    }
}

export const useVerifyMyUser = () => {
    const verifyMyUserRequest = async (otpData)=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(otpData),
            credentials: 'include',
        });
        
        if (!response.ok) {
            throw new Error('Error verifying OTP');
        }
        return response.json();
    }
    
     const {
        mutateAsync: verifyMyUser,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: verifyMyUserRequest,
    });
    
    return {
        verifyMyUser,
        isPending,
        isError,
        isSuccess
    }
}

