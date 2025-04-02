

import axios from 'axios';


export const loginApi = async (data) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users-service/auth/verify`, data);
    return response.data;
};


export const otpVerifyApi = async (data) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users-service/auth/login`, data);
    return response.data;
};

export const signupApi = async (data) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users-service/auth/register`, data);
    return response.data;
};

export const passwordreset = async (data) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users-service/auth/forgotpassword`, data);
    return response.data;
};


export const validateResetKeyApi = async (data) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users-service/auth/validateresetkey`, data);
    return response.data;
};


export const updatenewpassword = async (data) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users-service/auth/validateresetkey`, data);
    return response.data;
};

// export const signupApi = async (data) => {
//     try {
//         const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/users-service/auth/register', data);
//         return response.data;
//     } catch (error) {
//         console.error('Error posting data:', error);
//         throw error;
//     }
// };