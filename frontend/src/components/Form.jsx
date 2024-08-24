// Import necessary React hooks and modules
import { useState } from "react"; // useState hook for managing state
import api from "../api"; // Custom API instance for making HTTP requests
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; // Constants for token storage keys
import "../styles/Form.css"; // CSS file for styling the form component
import LoadingIndicator from "./LoadingIndicator"; // Component to show a loading spinner

// Form component definition
function Form({ route, method }) {
    // State variables to store username, password, and loading status
    const [username, setUsername] = useState(""); // State for the username input
    const [password, setPassword] = useState(""); // State for the password input
    const [loading, setLoading] = useState(false); // State to show/hide the loading indicator

    // Hook for navigating programmatically
    const navigate = useNavigate();

    // Determine the form name based on the method (either "login" or "register")
    const name = method === "login" ? "Login" : "Register";

    // Function to handle form submission
    const handleSubmit = async (e) => {
        setLoading(true); // Set loading state to true when submission starts
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Make an API POST request to the provided route with username and password
            const res = await api.post(route, { username, password });
            
            // If the method is "login", store the access and refresh tokens in localStorage
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access); // Store access token
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh); // Store refresh token
                navigate("/"); // Navigate to the home page after successful login
            } else {
                // If method is not "login", navigate to the login page (registration complete)
                navigate("/login");
            }
        } catch (error) {
            // Show an alert if an error occurs during the API request
            alert(error);
        } finally {
            setLoading(false); // Set loading state to false after submission is complete
        }
    };

    // JSX to render the form component
    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1> {/* Display form name based on the method */}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state on change
                placeholder="Username" // Placeholder text for username input
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                placeholder="Password" // Placeholder text for password input
            />
            {loading && <LoadingIndicator />} {/* Show loading indicator if loading is true */}
            <button className="form-button" type="submit">
                {name} {/* Button text based on the method */}
            </button>
        </form>
    );
}

// Exporting the Form component as the default export
export default Form;
