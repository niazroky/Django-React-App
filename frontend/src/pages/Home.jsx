// Importing necessary hooks from React
import { useState, useEffect } from "react";
// Importing a pre-configured API instance for making HTTP requests
import api from "../api";
// Importing a component to display individual notes
import Note from "../components/Note";
// Importing CSS file for styling the component
import "../styles/Home.css";

// Main component function
function Home() {
    // State variables for storing notes, content of a new note, and title of a new note
    const [notes, setNotes] = useState([]); // Array of notes
    const [content, setContent] = useState(""); // Content of the new note
    const [title, setTitle] = useState(""); // Title of the new note

    // useEffect hook to fetch notes when the component mounts
    useEffect(() => {
        getNotes(); // Calls the function to fetch notes
    }, []); // Empty dependency array ensures it runs only once when component mounts

    // Function to fetch notes from the API
    const getNotes = () => {
        api
            .get("/api/notes/") // API call to get the list of notes
            .then((res) => res.data) // Extract data from the response
            .then((data) => {
                setNotes(data); // Update state with the fetched notes
                console.log(data); // Log the data for debugging purposes
            })
            .catch((err) => alert(err)); // Handle errors by showing an alert
    };

    // Function to delete a note by its ID
    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`) // API call to delete the note
            .then((res) => {
                if (res.status === 204) alert("Note deleted!"); // Alert if deletion is successful
                else alert("Failed to delete note."); // Alert if deletion fails
                getNotes(); // Refresh the list of notes
            })
            .catch((error) => alert(error)); // Handle errors by showing an alert
    };

    // Function to create a new note
    const createNote = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        api
            .post("/api/notes/", { content, title }) // API call to create a new note with current content and title
            .then((res) => {
                if (res.status === 201) alert("Note created!"); // Alert if creation is successful
                else alert("Failed to make note."); // Alert if creation fails
                getNotes(); // Refresh the list of notes
            })
            .catch((err) => alert(err)); // Handle errors by showing an alert
    };

    // JSX to render the component
    return (
        <div>
            <div>
                <h2>Notes</h2>
                {/* Map over the notes array to render each note using the Note component */}
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            {/* Form for creating a new note */}
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)} // Update title state on change
                    value={title} // Controlled component
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content} // Controlled component
                    onChange={(e) => setContent(e.target.value)} // Update content state on change
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

// Exporting the Home component as the default export
export default Home;
