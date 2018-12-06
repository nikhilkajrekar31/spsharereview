import React, { Component } from 'react';
import Template from './../Template';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoadingTemplate extends Component {
  render() {
    const innerView = <div>
      {this.props.innerView}
      <FontAwesomeIcon icon='spinner' spin size='3x'/>
    </div>;
    return (
      <Template innerView={innerView}></Template>
    );
  }
}

export default LoadingTemplate;
