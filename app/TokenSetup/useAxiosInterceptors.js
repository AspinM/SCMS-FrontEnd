import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAxiosInterceptors = () => {
    const router = useRouter();

    useEffect(() => {
        // Request interceptor to add accessToken to headers
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor to handle 401 errors
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Token is expired or invalid
                    localStorage.removeItem('accessToken');
                    router.push('/login');
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors when component unmounts
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [router]);

    return null; // No UI component
};

export default useAxiosInterceptors;
