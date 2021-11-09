import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Home />
    </div>
  );
}

export default App;
