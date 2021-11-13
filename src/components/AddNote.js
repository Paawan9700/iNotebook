import React, { useContext, useState} from "react";
import notecontext from "../context/notes/notecontext";

export const AddNote = () => {
  const context = useContext(notecontext);
  const { addNote } = context;

  const [note, setnote] = useState({title: "", description: "", tag: ""})

  const handleClick = (e) => {
      e.preventDefault();
      addNote(note)
  };

  const onchange = (event) => {
        setnote({...note, [event.target.name]: event.target.value});
  }

  return (
    <div className="container my-3">
      <h1>Add your Notes</h1>
      <form>
        <div className="form-group my-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={onchange}
          />
        </div>
       
        <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};
