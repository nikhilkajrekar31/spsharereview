import React, { Component } from 'react';
import Template from './../../Template';

class Main extends Component {
  render() {
    const innerView = <h2>
      It's just a 404 Error!
    </h2>;
    return (
      <Template innerView={innerView}></Template>
    );
  }
}

export default Main;
