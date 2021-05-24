import React, { useState } from "react";
import './App.css';
import Navigation from './Components/Navigation';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Navigation>
        <Home />
       </Navigation>
      </header>
    </div>
  );
}

export default App;
