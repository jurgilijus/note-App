import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { IoCreateOutline } from "react-icons/io5";
import Notes from "../Notes/Notes";
import { UserAuth } from "../../Context/AuthContext";

// CSS
import "./Main.css";

function Main() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const q = collection(db, "notes");

  const navigate = useNavigate();

  const { user, logout } = UserAuth();

  const handleLogout = async (user) => {
    try {
      await logout();
      navigate("/");
      alert("User: " + user.email + " logged out");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const q = collection(db, "notes");
    const getNotes = onSnapshot(q, (querySnapshot) => {
      let notesArray = [];
      querySnapshot.forEach((doc) => {
        notesArray.push({ ...doc.data(), id: doc.id });
      });
      setNotes(notesArray);
    });
    return () => getNotes();
  }, []);

  const createNote = async (e) => {
    e.preventDefault(e);
    const currentDate = new Date();
    const dateOfCreation = `${currentDate.getFullYear()} - ${
      currentDate.getMonth().toString() + 1
    } - ${currentDate.getDate().toString().padStart(2, "0")}`;
    const timeOfCreation = `${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
    // if (input === "") {
    //   alert("Please enter missing input");
    //   return;
    // }
    try {
      await addDoc(q, {
        title: title,
        text: text,
        toDoDate: date,
        creationDate: dateOfCreation,
        creationTime: timeOfCreation,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteNote = async (id) => {
    const note = doc(db, "notes", id);
    await deleteDoc(note);
  };
  const toogleDone = async (note) => {
    await updateDoc(doc(db, "notes", note.id), {
      done: !note.done,
    });
  };

  return (
    <div className="conteiner">
      <form onSubmit={createNote} className="form-conteiner">
        <h2>Create note</h2>
        <p>User: {user.email}</p>

        <input
          type="text"
          placeholder="Title..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <textarea
          type="text"
          placeholder="Your text..."
          rows={5}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <label>To do date:</label>
        <input
          type="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />

        <button type="submit" title="create note" onClick={createNote}>
          Create <IoCreateOutline className="create-icon" />
        </button>
        <button onClick={handleLogout} title="Logout from account">
          Logout
        </button>
      </form>
      <section>
        {notes.map((note, index) => {
          return (
            <Notes
              key={index}
              note={note}
              toogleDone={toogleDone}
              deleteNote={deleteNote}
              setTitle={setTitle}
              setText={setText}
              setDate={setDate}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Main;
