import React, { Component } from 'react';
import { Glyphicon, Modal, Button } from 'react-bootstrap';
import user from '../../../models/User';
import DetailsView from './DetailsView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isDetailsModalShowing': false,
      'isDeleteDisabled': false,
      'isActivateDisabled': false,
    };
  }

  detailsModal() {
    return <Modal
      show={this.state.isDetailsModalShowing}
      onHide={() => {
        this.setState({
          'isDetailsModalShowing': false,
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {this.props.item.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DetailsView
          group={this.props.item}
        />
      </Modal.Body>
    </Modal>;
  }

  delete() {
    this.setState({
      'isDeleteDisabled': true,
    });
    user.deleteGroup(this.props.item)
      .then(() => this.props.triggerReset());
  }

  toggleActivation() {
    const group = this.props.item;
    const data = {
      'isActive': !group.isActive
    };
    this.setState({
      'isActivateDisabled': true,
    }, () => {
      user.updateGroupTo(group, data)
        .then(() => this.props.triggerReset());
    });
  }

  render() {
    const group = this.props.item;
    let style = {};
    if (!group.isActive) {
      style.backgroundColor = 'gray';
      style.color = 'lightGray';
    }
    return (
      <tr
        key={this.props.index}
        style={style}
      >
        {this.detailsModal()}
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
              {group.name}
            </div>
          </div>
        </td>
        <td>
          <div
            style={{
              'overflowX': 'scroll',
              'width': '8rem',
            }}
          >
            <div
              style={{
                'width': 'auto',
                'whiteSpace':'nowrap',
              }}
            >
              {
                new Date(group.createDate).toGMTString()
              }
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
                onClick={() => {
                  this.setState({
                    'isDetailsModalShowing': true,
                  });
                }}
              >
                <Glyphicon glyph='open-file'/>
              </Button>
              {' '}
              {user.isAdmin() &&
                <Button
                  disabled={this.state.isActivateDisabled}
                  title={(group.isActive ? 'Disable' : 'Enable') + ' Group'}
                  onClick={() => this.toggleActivation()}
                  bsStyle={group.isActive ? 'danger' : 'success'}
                >
                  <Glyphicon glyph='off'/>
                </Button>
              }
              {' '}
              {(user.isAdmin() || (user.info.email_address === group.owner)) &&
                <Button
                  disabled={this.state.isDeleteDisabled}
                  onClick={() => this.delete()}
                  bsStyle='danger'
                >
                  <Glyphicon glyph='remove'/>
                </Button>
              }
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default Main;
