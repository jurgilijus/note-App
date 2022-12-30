import React, { useEffect, useState } from "react";
import { db } from "../../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { AiFillDelete } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

// CSS
import "./Main.css";

function Main() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newDate, setNewDate] = useState("");
  const [noteBorder, setNoteBorder] = useState([]);
  const [arrow, setArrow] = useState(false);

  const userCollectionRef = collection(db, "notes");

  const changeNoteSize = (i) => {
    const arrowId = notes[i];
    if (!arrow === !arrow) {
      setArrow(arrowId.id);
    } else {
      setArrow(arrowId.id);
    }
  };

  // console.log(noteBorder);
  const handleDoneNote = (i) => {
    const border = notes[i];
    setNoteBorder(border.id);
  };

  useEffect(() => {
    const userCollectionRef = collection(db, "notes");
    const getNotes = async () => {
      const data = await getDocs(userCollectionRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getNotes();
  }, []);

  const createNote = async () => {
    const currentDate = new Date();
    const dateOfCreation = `${currentDate.getFullYear()} - ${currentDate.getMonth()} - ${currentDate.getDate()} / ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    try {
      await addDoc(userCollectionRef, {
        title: newTitle,
        text: newText,
        date: newDate,
        creationTime: dateOfCreation,
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

        <label>To do date:</label>
        <input
          type="date"
          onChange={(event) => {
            setNewDate(event.target.value);
          }}
        />

        <button type="submit" onClick={createNote} title="create note">
          Create <IoCreateOutline className="create-icon" />
        </button>
      </div>
      <div className="form">
        {notes.map((note, i) => {
          return (
            <div
              key={note.id}
              className={
                noteBorder === note.id
                  ? "note-conteiner green"
                  : "note-conteiner"
              }
            >
              <label>Note created: </label>
              <p className="note-time">{note.creationTime}</p>
              <div className="btn-aligne">
                <button
                  onClick={() => changeNoteSize(i)}
                  className="size-btn"
                  title="hide note"
                >
                  {arrow == note.id ? <SlArrowDown /> : <SlArrowUp />}
                </button>
                <button
                  onClick={() => handleDoneNote(i)}
                  className="done-btn"
                  title="done"
                >
                  done
                </button>
                <button
                  className="delete-note"
                  onClick={() => {
                    deleteNote(note.id);
                  }}
                  title="delete note"
                >
                  <AiFillDelete />
                </button>
              </div>
              <h4>{note.title}</h4>
              <p>{note.text}</p>

              <p>To do date: {note.date}</p>
              {/* {console.log(note.id)} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
