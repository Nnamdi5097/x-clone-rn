 import axios, { AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";
import { useMemo } from "react";

//For Web/Browser testing, localhost is fine. 
// For physical devices, use your computer's IP (e.g., "http://192.168.1.5:5001/api")
const API_BASE_URL = "https://x-clone-rn-drab.vercel.app/api";

export const createApiClient = (getToken: () => Promise<string | null>): AxiosInstance => {
  const api = axios.create({ 
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  api.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        // console.log("Token attached successfully"); // Useful for debugging
      }
    } catch (error) {
      console.error("Error getting Clerk token:", error);
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  
  // useMemo ensures we don't recreate the client unnecessarily
  return useMemo(() => createApiClient(getToken), [getToken]);
};

export const userApi = {
  syncUser: (api: AxiosInstance) => api.post("/users/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
  updateProfile: (api: AxiosInstance, data: any) => api.put("/users/profile", data),
};

export const postApi = {
  createPost: (api: AxiosInstance, data: { content: string; image?: string }) =>
    api.post("/posts", data),
  getPosts: (api: AxiosInstance) => api.get("/posts"),
  getUserPosts: (api: AxiosInstance, username: string) => api.get(`/posts/user/${username}`),
  likePost: (api: AxiosInstance, postId: string) => api.post(`/posts/${postId}/like`),
  deletePost: (api: AxiosInstance, postId: string) => api.delete(`/posts/${postId}`),
};

export const commentApi = {
  createComment: (api: AxiosInstance, postId: string, content: string) =>
    api.post(`/comments/post/${postId}`, { content }),
};