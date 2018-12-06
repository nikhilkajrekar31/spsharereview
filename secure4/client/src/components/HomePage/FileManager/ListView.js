import React, { Component } from 'react';
import user from '../../../models/User';
import RowView from './RowView';
import { mapDispatchToProps, mapStateToProps } from '../../../models/stores/Main';
import { connect } from 'react-redux';
import ListView from '../../GenericManager/ListView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.listView = React.createRef();
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this.props.fetchFilesFor(user)
        .then(() => {
          resolve(this.props.files);
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
      'File',
      'Created On',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { 'withRef': true },
)(Main);
