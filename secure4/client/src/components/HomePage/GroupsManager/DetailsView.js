import React, { Component } from 'react';
import { Panel, ListGroupItem, ListGroup } from 'react-bootstrap';
import { mapDispatchToProps, mapStateToProps } from '../../../models/stores/Main';
import { connect } from 'react-redux';


class Main extends Component {
  viewFor(index, user) {
    return <ListGroupItem
      key={index}
    >
      {user}
    </ListGroupItem>;
  }

  viewForUsers() {
    const list = [];
    const users = this.props.group.users;
    for (let i=0; i<users.length; i++) {
      list.push(
        this.viewFor(i, users[i])
      );
    }
    return <Panel>
      <Panel.Heading>
        <Panel.Title>Users</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <div
          style={{
            'overflowY': 'scroll',
            'maxHeight': '200px',
          }}
        >
          <ListGroup>
            { list }
          </ListGroup>
        </div>
      </Panel.Body>
    </Panel>;
  }

  viewForFiles() {
    const list = [];
    let files = this.props.files;
    files = files.filter(file => {
      const id = file._id;
      const index = this.props.group.files.indexOf(id);
      return index >= 0;
    });
    for (let i=0; i<files.length; i++) {
      list.push(
        this.viewFor(i, files[i].filename)
      );
    }
    return <Panel>
      <Panel.Heading>
        <Panel.Title>Files</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <div
          style={{
            'overflowY': 'scroll',
            'maxHeight': '200px',
          }}
        >
          <ListGroup>
            { list }
          </ListGroup>
        </div>
      </Panel.Body>
    </Panel>;
  }

  render() {
    return (
      <div>
        {this.viewForUsers()}
        {this.viewForFiles()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
