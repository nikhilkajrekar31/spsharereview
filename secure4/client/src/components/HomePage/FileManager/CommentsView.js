import React, { Component } from 'react';
import { ListGroupItem, ListGroup, Button, Well, Col, Row } from 'react-bootstrap';
import user from '../../../models/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '../../TextField';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isAddDisabled': true,
      'isCommentsLoaded': false,
      'isLoadSuccessfully': false,
      'comments': null,
    };
    this.textField = React.createRef();
    this.fetchComments();
  }
  reset() {
    this.textField.current.clearTextFieldText();
    this.setState({
      'isCommentsLoaded': false,
      'isLoadSuccessfully': false,
      'comments': null,
    }, () => {
      this.fetchComments();
    });
  }

  fetchComments() {
    user.getCommentsFor(this.props.file)
      .then(comments => {
        this.setState({
          'isCommentsLoaded': true,
          'isLoadSuccessfully': true,
          'comments': comments,
        });
      })
      .catch(err => {
        this.setState({
          'isCommentsLoaded': true,
          'isLoadSuccessfully': false,
        });
      });
  }

  message() {
    if (this.state.isCommentsLoaded) {
      if (this.state.isLoadSuccessfully) {
        if (!this.state.comments.length > 0) {
          return <p>No Comments to show.</p>;
        }
      } else {
        return <p>Something went wrong. Please try Again.</p>;
      }
    } else {
      return <div>
        <p>Loading Comments... <FontAwesomeIcon icon='spinner' spin/></p>
      </div>;
    }
  }

  viewFor(index, comment) {
    return <ListGroupItem
      key={index}
      header={comment.user.name + ' on ' + new Date(comment.createDate).toGMTString()}
    >
      {comment.text}
    </ListGroupItem>;
  }

  viewForComments() {
    const list = [];
    const comments = this.state.comments;
    for (let i=0; i<comments.length; i++) {
      list.push(
        this.viewFor(i, comments[i])
      );
    }
    return <div
      style={{
        'overflowY': 'scroll',
        'maxHeight': '400px',
      }}
    >
      <ListGroup>
        { list }
      </ListGroup>
    </div>;
  }

  view() {
    if (this.state.isCommentsLoaded &&
      this.state.isLoadSuccessfully &&
      this.state.comments.length > 0) {
      return this.viewForComments();
    } else {
      return <Row>
        <Col smOffset={4} sm={4}>
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

  commentChangedTo(text) {
    if (text === '') {
      this.setState({
        'isAddDisabled': true,
      });
    } else {
      this.setState({
        'isAddDisabled': false,
      });
    }
  }

  comment() {
    const text = this.textField.current.state.value.trim();
    if (text === '') return;
    this.setState({
      'isAddDisabled': true,
      'isCommentsLoaded': false,
    }, () => {
      user.addComment(this.props.file, text)
        .then(() => {
          this.reset();
        })
        .catch(() => {
          this.setState({
            'isAddDisabled': false,
            'isCommentsLoaded': true,
          });
        });
    });
  }

  form() {
    return <form>
      <TextField
        ref={this.textField}
        controlId={'comment_'+this.props.file._id}
        label='Comment'
        value={''}
        valueChangedTo={(text) => this.commentChangedTo(text)}
        enterPressedWith={() => this.comment()}
      />
      <Button
        disabled={this.state.isAddDisabled}
        bsStyle='primary'
        onClick={() => this.comment()}
      >
      Add
      </Button>
    </form>;
  }

  render() {
    return (
      <div>
        { this.view() }
        <hr/>
        { this.form() }
      </div>
    );
  }
}

export default Main;
