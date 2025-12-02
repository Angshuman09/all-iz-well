import { useMutation, useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const useStudentForm = () => {
    const studentForm = async (user) => {
        const response = await fetch(`${API_BASE_URL}/api/v1/student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            credentials: 'include',
        })

        if (!response.ok) {
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

// features

//student mood
export const useSetStudentMood = () => {
    const SetStudentMood = async (mood) => {
        const response = await fetch(`${API_BASE_URL}/api/v1/features/mood`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mood),
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error("Failed to set student mood");
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

// assessment test
export const useAssessmentTest = () => {
    const SetAssessment = async (assess) => {
        const response = await fetch(`${API_BASE_URL}/api/v1/features/assessment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assess),
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error("Failed to set student mood");
        }

        return response.json();
    }

    const {
        mutateAsync: submitAssessmentMutation,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: SetAssessment,
    });

    return {
        submitAssessmentMutation,
        isPending,
        isError,
        isSuccess
    }
}

//post - create, delete, report
// backend
// router.post('/create', authMiddleware, isStudent, createPost);
// router.get('/all-posts', authMiddleware, isStudent, getAllPosts);
// router.post('/like/:postId', authMiddleware, isStudent, toggleLike);
// router.post('/report/:postId', authMiddleware, isStudent, reportPost);
// router.delete('/:postId', authMiddleware, deletePost);
// router.get('/trending', authMiddleware, getTrendingTags);
export const useCreateMyPost = () => {
    const CreateMyPost = async (post) => {
        const response = await fetch(`${API_BASE_URL}/api/v1/features/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error("Failed to create post");
        }

        return response.json();
    }

    const {
        mutateAsync: createPost,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: CreateMyPost,
    });

    return {
        createPost,
        isPending,
        isError,
        isSuccess
    }
}

export const useGetAllPosts = () => {
    const GetAllPosts = async () => {
        const response = await fetch(`${API_BASE_URL}/api/v1/features/all-posts`, {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) throw new Error("error in fetching student data");

        return response.json();
    }

    const {
        data: allPosts,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["allPosts"],
        queryFn: GetAllPosts,
    });

    return {
        allPosts,
        isLoading,
        isError,
        isSuccess,
        refetch
    };
}

export const useLikeThePost = () => {
    const LikeThePost = async (postId) => {
        const response = await fetch(`${API_BASE_URL}/api/v1/features/like/${postId}`, {
            method: 'POST',
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error("Failed to like a post");
        }

        return response.json();
    }

    const {
        mutateAsync: likePost,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: LikeThePost,
    });

    return {
        likePost,
        isPending,
        isError,
        isSuccess
    }
}

export const useReportThePost = ()=>{
    const ReportThePost = async (postId)=>{
        const response = await fetch(`${API_BASE_URL}/api/v1/features/report/${postId}`,{
        method: 'POST',
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error("Failed to report a post");
        }

        return response.json();
    }

    const {
        mutateAsync: reportPost,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: ReportThePost,
    });

    return {
        reportPost,
        isPending,
        isError,
        isSuccess
    }
}

export const useDeleteThePost = ()=>{
    const DeleteThePost = async (postId)=>{
    const response = await fetch(`${API_BASE_URL}/api/v1/features/${postId}`,{
        method: 'DELETE',
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error("Failed to report a post");
        }

        return response.json();
    }

    const {
        mutateAsync: deletePost,
        isPending,
        isError,
        isSuccess
    } = useMutation({
        mutationFn: DeleteThePost,
    });

    return {
        deletePost,
        isPending,
        isError,
        isSuccess
    }
}

export const useGetTrendingTags = ()=>{
    const GetTrendingTags = async ()=>{
   const response = await fetch(`${API_BASE_URL}/api/v1/features/trending`, {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) throw new Error("error in fetching student data");

        return response.json();
    }

    const {
        data: getTrending,
        isLoading,
        isError,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ["getTrending"],
        queryFn: GetTrendingTags,
    });

    return {
        getTrending,
        isLoading,
        isError,
        isSuccess,
        refetch
    };
}

export const useGetStudentData = () => {
    const GetStudentData = async () => {
        const response = await fetch(`${API_BASE_URL}/api/v1/student`, {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) throw new Error("error in fetching student data");

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

