import React, { Component } from 'react';
import Template from './../../Template';

class Main extends Component {
  render() {
    const innerView = <h2>Please <a href='/signin'>Sign in</a> to continue.</h2>;
    return (
      <Template innerView={innerView}></Template>
    );
  }
}

export default Main;
