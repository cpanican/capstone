import React, { Component } from 'react';
import './App.css';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class App extends Component {
  render() {
    ipcRenderer.send('from-react', 'THIS IS FROM ME');
    return (
      <div className="App">
        Hand Signals With Visual Data
      </div>
    );
  }
}

export default App;
