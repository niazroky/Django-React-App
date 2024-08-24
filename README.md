# Full-Stack Web Application with Django and React

This project demonstrates the creation of a full-stack web application using Django as the backend and React as the frontend. The application is designed to manage and display notes, showcasing CRUD (Create, Read, Update, Delete) functionalities with JWT authentication.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Setup](#project-setup)
  - [Backend (Django)](#backend-django)
  - [Frontend (React)](#frontend-react)
- [Application Structure](#application-structure)
  - [Backend (Django)](#backend-django-structure)
  - [Frontend (React)](#frontend-react-structure)
- [How to Run](#how-to-run)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project utilizes Django, a high-level Python web framework, to build a secure and scalable backend API, and React, a popular JavaScript library, to create a dynamic and responsive frontend interface. By integrating these two technologies, the project aims to provide a full-stack solution that handles both server-side logic and client-side interactions.

### Technologies Used

- **Backend**: Django, Django REST Framework, Django REST Framework SimpleJWT, Django CORS Headers
- **Frontend**: React, React Router, Axios, Vite
- **Database**: SQLite (default for Django, easily replaceable with other databases)
- **Authentication**: JWT (JSON Web Token)

## Features

- **User Authentication**: Secure user login and registration using JWT.
- **Notes Management**: CRUD operations for notes, including the ability to create, read, update, and delete notes.
- **API Endpoints**: RESTful API endpoints for managing notes and user authentication.
- **Responsive UI**: A user-friendly interface for interacting with the application.
- **Error Handling**: Graceful error handling for API requests and form submissions.

## Project Setup

### Backend (Django)

1. **Framework Overview**: Django is used as the backend framework following the Model-View-Template (MVT) pattern.

2. **Setup**:
   - Initialize a new Django project:
     ```bash
     django-admin startproject projectname
     ```
   - Create a new app within the Django project:
     ```bash
     django-admin startapp appname
     ```

3. **Models**: Define models in `models.py` for representing data structures (e.g., `Note` model with `title` and `content` fields).

4. **Serializers**: Use Django REST Framework serializers to convert model instances into JSON format.

5. **Views**: Implement class-based views to handle HTTP requests for notes (create, retrieve, update, delete).

6. **URLs**: Configure URL patterns in `urls.py` to route requests to the appropriate views.

7. **JWT Authentication**: Use the `djangorestframework-simplejwt` package for handling user authentication and token generation.

8. **CORS Configuration**: Use `django-cors-headers` to enable cross-origin requests from the React frontend.

### Frontend (React)

1. **Framework Overview**: React is used for building the frontend, focusing on creating a seamless and interactive user experience.

2. **Setup**:
   - Create a new React project using Vite:
     ```bash
     npm create vite@latest
     ```

3. **Component Structure**: Break down the UI into reusable components, such as note display, note creation, and user interaction components.

4. **State Management**: Use React's `useState` hook to manage component state, enabling dynamic responses to user inputs (e.g., adding or deleting notes).

5. **API Interaction**: Use Axios to make HTTP requests to the Django backend, handling CRUD operations for notes.

6. **Routing**: Use React Router to manage navigation between different views or pages in the application.

7. **Handling User Input**: Create forms to capture user inputs (e.g., creating notes), managing form state, and handling form submissions.

8. **Displaying Data**: Dynamically render lists of notes by mapping over the state holding the notes data.

9. **Error Handling**: Implement error handling for API requests, providing user feedback in case of issues (e.g., failed requests).

## Application Structure

### Backend (Django)

- **Models**: Define data models using Django's ORM.
- **Serializers**: Convert model instances to JSON format.
- **Views**: Handle HTTP requests using class-based views.
- **URLs**: Route requests using Django's URL dispatcher.
- **Authentication**: Implement JWT-based authentication.

### Frontend (React)

- **Components**: Create reusable UI components.
- **State Management**: Manage state using React hooks.
- **API Interaction**: Make HTTP requests using Axios.
- **Routing**: Navigate between views using React Router.
- **Error Handling**: Handle errors gracefully.

## How to Run

1. **Backend**:
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run migrations:
     ```bash
     python manage.py migrate
     ```
   - Start the Django server:
     ```bash
     python manage.py runserver
     ```

2. **Frontend**:
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm run dev
     ```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
