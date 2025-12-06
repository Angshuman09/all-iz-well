import { useMutation, useQuery } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';


//Authentication - register, login, email verification
export const useCreateMyUser = () => {
    const createMyUserRequest = async (user) => {
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
    const verifyMyUserRequest = async (otpData) => {
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

export const useLoginMyUser = () => {
    const loginMyUserRequest = async (loginData) => {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error("Failed to login user");
        }
        return response.json();
    }
    const {
        mutateAsync: loginMyUser,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: loginMyUserRequest,
    });

    return {
        loginMyUser,
        isPending,
        isError,
        isSuccess
    }
}

export const useLogoutMyUser = () => {
    const logoutMyUserRequest = async () => {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error("Failed to logout user");
        }

        return response.json();
    }

    const {
        mutateAsync: logoutMyUser,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: logoutMyUserRequest,
    });

    return {
        logoutMyUser,
        isPending,
        isError,
        isSuccess
    }
}


export const useGetUsers = () => {

    const fetchUsers = async () => {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/get-data`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch users");

        return response.json();
    };

    const {
        data: users,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    return {
        users,
        isLoading,
        isError,
        isSuccess,
        refetch
    };
};

