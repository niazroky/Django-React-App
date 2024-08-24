// Importing React's StrictMode for highlighting potential issues in an application
import { StrictMode } from 'react';

// Importing the createRoot function from React DOM to create a root container for rendering the app
import { createRoot } from 'react-dom/client';

// Importing the main App component that contains the entire application
import App from './App.jsx';

// Creating a root container in the DOM by selecting the element with the id 'root'
// This is where the entire React application will be rendered
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Rendering the App component inside the root element, wrapped in StrictMode */}
    {/* StrictMode helps in identifying potential problems in an application during development */}
    <App />
  </StrictMode>,
);
