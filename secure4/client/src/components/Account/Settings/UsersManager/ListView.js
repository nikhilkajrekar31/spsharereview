import React, { Component } from 'react';
import user from '../../../../models/User';
import RowView from './RowView';
import ListView from '../../../GenericManager/ListView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.listView = React.createRef();
  }

  fetch() {
    return new Promise((resolve, reject) => {
      user.fetchUsers()
        .then(users => {
          resolve(users);
        })
        .catch(err => reject(err));
    });
  }

  rowFor(index, item) {
    return <RowView
      index={index+1}
      key={index}
      item={item}
      triggerReset={() => this.reset()}
    />;
  }

  headerFields() {
    return [
      'User',
      'Options'
    ];
  }

  reset() {
    this.listView.current.reset();
  }

  render() {
    return (
      <ListView
        ref={this.listView}
        rowFor={(index, item) => this.rowFor(index, item)}
        headerFields={this.headerFields()}
        fetchItems={() => this.fetch()}
      />
    );
  }
}

export default Main;
