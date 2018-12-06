import React, { Component } from 'react';
import { Glyphicon, Modal, Button } from 'react-bootstrap';
import user from '../../../models/User';
import CommentsView from './CommentsView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isCommentsModalShowing': false,
      'isDeleteDisabled': false,
    };
  }

  download(file) {
    user.download(file);
  }

  commentsModal() {
    return <Modal
      show={this.state.isCommentsModalShowing}
      onHide={() => {
        this.setState({
          'isCommentsModalShowing': false,
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Comments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommentsView
          file={this.props.item}
        />
      </Modal.Body>
    </Modal>;
  }

  delete() {
    this.setState({
      'isDeleteDisabled': true,
    });
    user.deleteFile(this.props.item)
      .then(() => this.props.triggerReset());
  }

  render() {
    return (
      <tr key={this.props.index}>
        {this.commentsModal()}
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
              {this.props.item.filename}
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
                new Date(this.props.item.uploadDate).toGMTString()
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
                onClick={() => this.download(this.props.item)}
              >
                <Glyphicon glyph='download-alt'/>
              </Button>
              {' '}
              <Button
                onClick={() => {
                  this.setState({
                    'isCommentsModalShowing': true,
                  });
                }}
              >
                <Glyphicon glyph='comment'/>
              </Button>
              {' '}
              {(user.isAdmin() || (user.info.email_address === this.props.item.metadata.owner)) &&
              <Button
                bsStyle='danger'
                disabled={this.state.isDeleteDisabled}
                onClick={() => this.delete()}
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
