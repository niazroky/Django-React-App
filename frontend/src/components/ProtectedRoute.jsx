// Import necessary modules and hooks from React and other libraries
import { Navigate } from "react-router-dom"; // For redirecting to a different route
import { jwtDecode } from "jwt-decode"; // For decoding JWT tokens
import api from "../api"; // Custom API instance for making HTTP requests
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"; // Constants for token storage keys
import { useState, useEffect } from "react"; // React hooks for managing state and side effects

// ProtectedRoute component definition
function ProtectedRoute({ children }) {
    // State variable to keep track of authorization status
    const [isAuthorized, setIsAuthorized] = useState(null);

    // useEffect hook to check authentication when the component mounts
    useEffect(() => {
        // Call the auth function to check if the user is authorized
        auth().catch(() => setIsAuthorized(false)); // If an error occurs, set isAuthorized to false
    }, []); // Empty dependency array means this runs once when the component mounts

    // Function to refresh the access token using the refresh token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN); // Get the refresh token from localStorage
        try {
            // Make a POST request to refresh the access token
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                // If the response is successful, store the new access token and authorize the user
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                // If the response is not successful, set authorization to false
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error); // Log the error to the console
            setIsAuthorized(false); // Set authorization to false in case of an error
        }
    };

    // Function to check the current authorization status
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN); // Get the access token from localStorage
        if (!token) {
            // If no token is found, set authorization to false
            setIsAuthorized(false);
            return;
        }

        // Decode the JWT token to check its expiration
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp; // Get the expiration time from the token
        const now = Date.now() / 1000; // Get the current time in seconds

        if (tokenExpiration < now) {
            // If the token is expired, attempt to refresh it
            await refreshToken();
        } else {
            // If the token is still valid, set authorization to true
            setIsAuthorized(true);
        }
    };

    // Render a loading indicator while the authorization status is being determined
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    // If authorized, render the children components, otherwise redirect to the login page
    return isAuthorized ? children : <Navigate to="/login" />;
}

// Exporting the ProtectedRoute component as the default export
export default ProtectedRoute;
