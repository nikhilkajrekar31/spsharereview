import React, { Component } from 'react';
import ListView from './ListView';
import GenericManager from '../../../GenericManager/Main';

class Main extends Component {
  render() {
    return (
      <GenericManager
        title={'Users'}
        listView={ListView}
      />
    );
  }
}

export default Main;
