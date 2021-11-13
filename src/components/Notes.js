import React, {useContext} from "react";
import notecontext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";


export const Notes = () => {
    const context = useContext(notecontext);
    const {notes} = context;

  return (
    <div className=" container row my-4">
      <h1> Your Notes</h1>
      {notes.map((note) => {
        return <Noteitem key = {note._id} note = {note}/>;
      })}
    </div>
  );
};
