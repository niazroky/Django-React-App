/*
This code creates a customized Axios instance for making HTTP requests to a predefined base URL, 
which is specified in the environment variables. Before each request, it checks for a JWT token 
stored in the local storage. If the token is found, it adds it to the request headers as a Bearer 
token, ensuring authenticated requests. This setup is essential for interacting with a backend 
that requires token-based authentication. 
*/


import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Create an Axios instance with a predefined base URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL  // Uses the base URL from environment variables
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);  // Retrieve the token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;  // Set the Authorization header if the token exists
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);  // Handle any errors in the request setup
    }
);

export default api;  // Export the Axios instance for use in other parts of the app