import React, { Component } from 'react';
import { Panel, Checkbox, Table, Well, Col, Row, Button } from 'react-bootstrap';
import user from '../../../models/User';
import TextField from '../../TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mapDispatchToProps, mapStateToProps } from '../../../models/stores/Main';
import { connect } from 'react-redux';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isCreateButtonDisabled': true,
      'isUsersLoaded': false,
      'isLoadSuccessfully': false,
      'users': null,
    };
    this.name = '';
    this.fetchFiles();
    this.selectedUsers = [];
    this.selectedFiles = [];
  }

  fetchFiles() {
    user.fetchUsers()
      .then(users => {
        this.setState({
          'isUsersLoaded': true,
          'isLoadSuccessfully': true,
          'users': users,
        });
      })
      .catch(err => {
        this.setState({
          'isUsersLoaded': true,
          'isLoadSuccessfully': false,
        });
      });
  }

  message() {
    if (this.state.isUsersLoaded) {
      if (this.state.isLoadSuccessfully) {
        if (!this.state.users.length > 0) {
          return <p>No Users to show.</p>;
        }
      } else {
        return <p>Something went wrong. Please try Again.</p>;
      }
    } else {
      return <div>
        <p>Loading Users... <FontAwesomeIcon icon='spinner' spin/></p>
      </div>;
    }
  }

  toggleForUsers(e, user) {
    const key = user.email_address;
    if (e.target.checked) {
      this.selectedUsers.push(key);
    } else {
      const index = this.selectedUsers.indexOf(key);
      this.selectedUsers.splice(index, 1);
    }
  }

  rowsForUsers(users) {
    const rows = [];
    for (let i=0; i<users.length; i++) {
      rows.push(
        <tr key={i}>
          <td style={{'textAlign': 'center'}}>
            <Checkbox
              onChange={e => {
                this.toggleForUsers(e, users[i]);
              }}
            />
          </td>
          <td>
            {users[i].name}
          </td>
          <td>
            {users[i].email_address}
          </td>
        </tr>
      );
    }
    return rows;
  }

  viewForUsers() {
    return <div
      style={{
        'overflowY': 'scroll',
        'maxHeight': '200px',
      }}
    >
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email Address</th>
          </tr>
        </thead>
        <tbody>
          { this.rowsForUsers(this.state.users) }
        </tbody>
      </Table>
    </div>;
  }

  toggleForFiles(e, file) {
    const key = file._id;
    if (e.target.checked) {
      this.selectedFiles.push(key);
    } else {
      const index = this.selectedFiles.indexOf(key);
      this.selectedFiles.splice(index, 1);
    }
  }

  rowsForFiles(files) {
    const rows = [];
    for (let i=0; i<files.length; i++) {
      rows.push(
        <tr key={i}>
          <td style={{'textAlign': 'center'}}>
            <Checkbox
              onChange={e => {
                this.toggleForFiles(e, files[i]);
              }}
            />
          </td>
          <td>
            {files[i].filename}
          </td>
        </tr>
      );
    }
    return rows;

  }

  viewForFiles() {
    return <div
      style={{
        'overflowY': 'scroll',
        'maxHeight': '200px',
      }}
    >
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          { this.rowsForFiles(this.props.files) }
        </tbody>
      </Table>
    </div>;
  }

  usersView() {
    if (this.state.isUsersLoaded &&
      this.state.isLoadSuccessfully &&
      this.state.users.length > 0) {
      return this.viewForUsers();
    } else {
      return <Row>
        <Col smOffset={4} sm={4}>
          <br/>
          <Well
            style={{
              'textAlign': 'center'
            }}
          >
            {this.message()}
          </Well>
        </Col>
      </Row>;
    }
  }

  groupNameChanged(name) {
    if (name === '') {
      this.setState({
        'isCreateButtonDisabled': true,
      });
    } else {
      this.setState({
        'isCreateButtonDisabled': false,
      });
    }
    this.name = name;
  }

  create() {
    if (this.state.isCreateButtonDisabled) return;
    this.setState({
      'isCreateButtonDisabled': true,
    });
    user.createGroup(this.name, this.selectedUsers, this.selectedFiles)
      .then(() => {
        this.props.onAdd();
      });
  }

  render() {
    return (
      <div>
        <form>
          <TextField
            controlId='groupName'
            label='Group Name'
            value={''}
            valueChangedTo={(name) => {
              this.groupNameChanged(name);
            }}
          />
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                Users
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <div

              >
              </div>
              { this.usersView() }
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Heading>
              <Panel.Title>
                Users
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              { this.viewForFiles() }
            </Panel.Body>
          </Panel>
          <hr/>
          <Button
            bsStyle="primary"
            disabled={this.state.isCreateButtonDisabled}
            onClick={() => this.create()}
          >
            Create
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
