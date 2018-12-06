import React, { Component } from 'react';
import LoadingTemplate from './../LoadingTemplate';

class Main extends Component {
  render() {
    const innerView = <h3>
      Validating Session...
    </h3>;
    return (
      <LoadingTemplate innerView={innerView}></LoadingTemplate>
    );
  }
}

export default Main;
