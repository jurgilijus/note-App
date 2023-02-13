import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FiEdit3 } from "react-icons/fi";
import NotePopup from "./NotePopup/NotePopup";

// CSS
import "./Notes.css";

function Notes({ note, toogleDone, deleteNote, setTitle, setText, setDate }) {
  const [arrow, setArrow] = useState(false);
  const [hideContent, setHideContent] = useState(false);
  const [popup, setPopup] = useState(false);

  const handlePopup = () => setPopup(!popup);

  const handleHideContent = () => {
    setHideContent(!hideContent);
  };

  const changeArrow = () => {
    setArrow(!arrow);
  };

  return (
    <div className={note.done ? "note-conteiner done" : "note-conteiner"}>
      <div className="note-header">
        <div className="note-header-text">
          <h4>{note.title}</h4>
          <p>Note created: {note.creationDate}</p>
          <p>{note.creationTime}</p>
        </div>
        <div className="btns">
          <button className="btn" title="edit note" onClick={handlePopup}>
            <FiEdit3 />
          </button>
          <button
            onClick={() => toogleDone(note)}
            className="btn"
            title="mark done"
          >
            done
          </button>
          <button
            onClick={() => {
              changeArrow();
              handleHideContent();
            }}
            className="btn"
            title="minimize"
          >
            {!arrow ? <SlArrowDown /> : <SlArrowUp />}
          </button>
          <button
            className="btn"
            onClick={() => deleteNote(note.id)}
            title="delete note"
          >
            <AiFillDelete />
          </button>
        </div>
      </div>
      <div className={hideContent ? "note-content hide" : "note-content"}>
        <textarea
          className="note-text"
          rows={8}
          defaultValue={note.text}
        ></textarea>
        <p>To do date: {note.toDoDate}</p>
      </div>
      {popup === true ? (
        <NotePopup note={note} hide={() => setPopup(false)} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Notes;
