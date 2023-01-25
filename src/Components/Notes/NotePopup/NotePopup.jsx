import React, { useState } from "react";
import ReactDOM from "react-dom";
import { db } from "../../../Firebase";
import { doc, updateDoc } from "firebase/firestore";

// CSS
import "./NotePopup.css";

function NotePopup({ note, hide }) {
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [newDate, setNewDate] = useState("");

  const updateNote = async (note) => {
    await updateDoc(doc(db, "notes", note.id), {
      title: newTitle,
      text: newText,
      toDoDate: newDate,
    });
  };
  return ReactDOM.createPortal(
    <>
      <div className="popup-overley">
        <div className="popup-conteinter">
          <form className="popup-form">
            <h2>Edit note</h2>

            <input
              id="title"
              type="text"
              placeholder="Title..."
              defaultValue={note.title}
              className={!newTitle ? "empty" : ""}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
            {!newTitle ? <p className="err">Title mus not be empty</p> : ""}

            <textarea
              type="text"
              placeholder="Your text..."
              rows={5}
              defaultValue={note.text}
              className={!newText ? "empty" : ""}
              onChange={(e) => {
                setNewText(e.target.value);
              }}
            />
            {!newText ? <p className="err">Note must not be empty</p> : ""}

            <label>To do date: {note.toDoDate}</label>
            <input
              type="date"
              className={!newDate ? "empty" : ""}
              onChange={(e) => {
                setNewDate(e.target.value);
              }}
            />
            {!newDate ? <p className="err">Date must not be empty</p> : ""}
            <button
              title="edit note"
              className="edit-btn"
              onClick={() => {
                if (!newTitle || !newText || !newDate) {
                  return alert("All emty slots must be filled");
                }
                updateNote(note);
                hide();
              }}
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default NotePopup;
