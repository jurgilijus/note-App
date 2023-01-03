import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

// CSS
import "./Notes.css";

function Notes({ note, toogleDone, deleteNote, minimizeNote }) {
  const [arrow, setArrow] = useState(false);
  const [hideContent, setHideContent] = useState(false);
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
        <p>{note.text}</p>
        <p>To do date: {note.toDoDate}</p>
      </div>
    </div>
  );
}

export default Notes;
