import React from "react";
import ReactDOM from "react-dom";
import { db } from "../../../Firebase";
import { doc, updateDoc } from "firebase/firestore";

// CSS
import "./NotePopup.css";

function NotePopup({ note, hide, setTitle, setText, setDate }) {
  const updateNote = async (note) => {
    await updateDoc(doc(db, "notes", note.id), {
      title: note.title,
      text: note.text,
      toDoDate: note.toDoDate,
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
                setTitle({ title: e.target.value });
              }}
            />

            <textarea
              type="text"
              placeholder="Your text..."
              rows={5}
              defaultValue={note.text}
              onChange={(e) => {
                setText({ title: e.target.value });
              }}
            />

            <label>To do date: {note.toDoDate}</label>
            <input
              type="date"
              onChange={(e) => {
                setDate({ title: e.target.value });
              }}
            />

            <button
              type="submit"
              title="edit note"
              className="edit-btn"
              onClick={() => {
                updateNote(note.id);
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
