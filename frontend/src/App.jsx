import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";



/**
 * Logout component
 * Clears local storage to log out the user and redirects to the login page.
 * 
 * @returns {JSX.Element} A Navigate component to redirect to the login page.
 */
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}



/**
 * RegisterAndLogout component
 * Clears local storage to log out the user and renders the Register component.
 * 
 * This can be useful if you want to ensure the user is logged out before
 * they register a new account.
 * 
 * @returns {JSX.Element} The Register component.
 */
function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}



/**
 * Main App component
 * Sets up the routes for the application, including protected routes that require authentication.
 * 
 * @returns {JSX.Element} The entire app wrapped in a BrowserRouter.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected route for the Home page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Route for the Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for logging out the user */}
        <Route path="/logout" element={<Logout />} />

        {/* Route for the Register page, also logs out the user */}
        <Route path="/register" element={<RegisterAndLogout />} />

        {/* Catch-all route for undefined paths, renders a 404 Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
