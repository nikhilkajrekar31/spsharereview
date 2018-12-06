import React, { Component } from 'react';
import AddView from './AddView';
import ListView from './ListView';
import GenericManager from '../../GenericManager/Main';

class Main extends Component {
  render() {
    return (
      <GenericManager
        title={'Groups'}
        listView={ListView}
        addView={AddView}
        addViewTitle={'Add Group'}
      />
    );
  }
}

export default Main;
