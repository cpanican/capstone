import React, { Component } from 'react';
import { GettingStarted, Splash, Main } from './Pages/index';
import './App.css';

const ipc = window.require('electron').ipcRenderer;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      winType: null,
    };
  }

  componentDidMount() {
    ipc.on('window-type', (ev, winType) => {
      this.setState({
        winType,
        loading: false,
      });
    });
    ipc.send('get-window', {});
  }

  render() {
    const { loading, winType } = this.state;
    return (
      <div className="App">
        {
          loading ? Splash : null
        }
        {
          !loading && winType === 'GettingStarted'
            ? <GettingStarted />
            : <Main />
        }
      </div>
    );
  }
}

export default App;
