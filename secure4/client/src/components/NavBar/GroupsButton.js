import React, { Component } from 'react';
// import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ButtonMenu from './ButtonMenu';

class GroupsButton extends Component {
  render() {
    const innerView = [
    ];

    return (
      <ButtonMenu id='groups_navbar' title='Groups' innerView={innerView}>
      </ButtonMenu>
    );
  }
}

export default GroupsButton;
