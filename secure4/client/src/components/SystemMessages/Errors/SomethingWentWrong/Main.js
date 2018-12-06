import React, { Component } from 'react';
import Template from './../../Template';

class Main extends Component {
  render() {
    const innerView = <h2>
      Something went wrong!
    </h2>;
    return (
      <Template innerView={innerView}></Template>
    );
  }
}

export default Main;
