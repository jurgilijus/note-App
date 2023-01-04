import React from "react";
import ReactDOM from "react-dom";
// import { db } from "../../Firebase";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   updateDoc,
// } from "firebase/firestore";

// CSS
import "./NotePopup.css";

function NotePopup({ note }) {
  // const editNote = () => {};
  return ReactDOM.createPortal(
    <>
      <div className="popup-conteinter">
        <form className="form-conteiner">
          <h2>Edit note</h2>

          <input type="text" placeholder="Title..." />

          <textarea type="text" placeholder="Your text..." rows={5} />

          <label>To do date:</label>
          <input type="date" />

          <button type="submit" title="edit note">
            Edit
          </button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default NotePopup;
