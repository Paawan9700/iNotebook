import React, { useContext } from "react";
import notecontext from "../context/notes/notecontext";

const Noteitem = (props) => {
  const context = useContext(notecontext);
  const { deleteNote } = context;

  // const handleclick = (noteid) => {
  //   deleteNote(noteid)
  // };

  const { _id, title, description } = props.note;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <i className="fas fa-trash-alt mx-3" onClick={() => {deleteNote(_id)}}></i>
          <i className="far fa-edit mx-3"></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
