import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import NoteState from "./context/notes/NotesState";

function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <div className = "conatiner">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
