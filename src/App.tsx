import React from 'react';
import './styles/tailwind.css';
import './styles/spendit-editor.css';
import {SpenditEditor} from "./components/SpenditEditor";

function App() {
  return (
    <div className="App">
        <h1 className="text-3xl font-bold text-center mb-5">Spendit Editor with PlateJS</h1>
        <div className="container">
            <SpenditEditor/>
        </div>
    </div>
  );
}

export default App;
