import React, { useEffect, useState } from "react";
import { db } from "../../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

// CSS
import "./Main.css";

function Main() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newDate, setNewDate] = useState("");
  const userCollectionRef = collection(db, "notes");

  useEffect(() => {
    const userCollectionRef = collection(db, "notes");
    const getNotes = async () => {
      const data = await getDocs(userCollectionRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getNotes();
  }, []);

  const createNote = async () => {
    try {
      await addDoc(userCollectionRef, {
        title: newTitle,
        text: newText,
        date: newDate,
      });
    } catch (error) {
      console.log(error.message);
    }
    window.location.reload();
  };

  // const updateNote = async (id, text) => {
  //   const noteDoc = doc(db, 'notes', id);
  //   const newNote = {text: text};
  //   await updateDoc(noteDoc, newNote)
  // }

  const deleteNote = async (id) => {
    const note = doc(db, "notes", id);
    await deleteDoc(note);
    window.location.reload();
  };

  return (
    <div className="login-conteiner">
      <div className="create-note form-conteiner">
        <h2>Create note</h2>

        <input
          type="text"
          placeholder="Title..."
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
        />

        <textarea
          type="text"
          placeholder="Your text..."
          rows={5}
          onChange={(event) => {
            setNewText(event.target.value);
          }}
        />

        <input
          type="date"
          onChange={(event) => {
            setNewDate(event.target.value);
          }}
        />

        <button type="submit" onClick={createNote}>
          Create
        </button>
      </div>
      <div className="form">
        {notes.map((note) => {
          return (
            <div key={note.id} className="form-conteiner">
              <h4>{note.title}</h4>
              <p>{note.text}</p>
              <button
                onClick={() => {
                  deleteNote(note.id);
                }}
              >
                Delete
              </button>
              <p>{note.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
