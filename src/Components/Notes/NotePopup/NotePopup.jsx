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
              type="text"
              placeholder="Title..."
              defaultValue={note.title}
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />

            <textarea
              type="text"
              placeholder="Your text..."
              rows={5}
              defaultValue={note.text}
              onChange={(e) => {
                setNewText(e.target.value);
              }}
            />

            <label>To do date: {note.toDoDate}</label>
            <input
              type="date"
              onChange={(e) => {
                setNewDate(e.target.value);
              }}
              // onChange={(e) => {
              //   setDate({ title: e.target.value });
              // }}
            />

            <button
              title="edit note"
              className="edit-btn"
              onClick={() => {
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
