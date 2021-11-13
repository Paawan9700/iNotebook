import React, {useContext} from "react";
import notecontext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";


export const Notes = () => {
    const context = useContext(notecontext);
    const {initialnotes, setnotes} = context;

  return (
    <div className="row my-4">
      <h1> Your Notes</h1>
      {initialnotes.map((note) => {
        return <Noteitem key = {note._id} note = {note}/>;
      })}
    </div>
  );
};
