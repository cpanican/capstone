import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Splash from './Splash';
import './Main.css';
import { MainHome } from '../Components';

const mHistory = createBrowserHistory();

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="main-container">
        {
              loading
                ? <Splash />
                : null
        }
        <Router history={mHistory}>
          <Switch>
            <Route exact path="/" component={MainHome} />
          </Switch>
        </Router>
      </div>
    );
  }
}
