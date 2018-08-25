import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          {/* <Route path="/report" component={Report} />
          <Route path="/journal" component={Journal} /> */}
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div >
    );
  }
}

export default Main;