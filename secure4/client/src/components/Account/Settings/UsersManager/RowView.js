import React, { Component } from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import user from '../../../../models/User';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isPromoteDisabled': false,
    };
  }

  togglePermissions() {
    const userItem = this.props.item;
    this.setState({
      'isPromoteDisabled': true,
    }, () => {
      user.updateUserIsAdminTo(userItem, !userItem.isAdmin)
        .then(() => this.props.triggerReset());
    });
  }

  render() {
    const userItem = this.props.item;
    return (
      <tr
        key={this.props.index}
      >
        <td>{this.props.index}</td>
        <td>
          <div
            style={{
              'overflowX': 'scroll',
              'width': '10rem',
            }}
          >
            <div
              style={{
                'width': 'auto',
                'whiteSpace':'nowrap',
              }}
            >
              {userItem.name}
            </div>
          </div>
        </td>
        <td style={{'textAlign': 'center'}}>
          <div
            style={{
              'overflowX': 'scroll',
              'width': '13rem',
            }}
          >
            <div
              style={{
                'width': 'auto',
                'whiteSpace':'nowrap',
              }}
            >
              <Button
                disabled={this.state.isPromoteDisabled}
                title={'Make ' + (userItem.isAdmin ? 'Standard' : 'Admin')}
                onClick={() => this.togglePermissions()}
                bsStyle={userItem.isAdmin ? 'danger' : 'success'}
              >
                <Glyphicon glyph='user'/>
              </Button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default Main;
