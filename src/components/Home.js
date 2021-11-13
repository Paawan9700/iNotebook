import React from "react";
import { AddNote } from "./AddNote";
import { Notes } from "./Notes";

export const Home = () => {
    
  return (
    <div className = "container">
      <AddNote />
        <Notes />
    </div>
  );
};
