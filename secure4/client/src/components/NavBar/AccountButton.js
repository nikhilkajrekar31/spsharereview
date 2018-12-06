import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import ButtonMenu from './ButtonMenu';
import auth0Client from '../../Auth/Auth.js';


class AccountButton extends Component {
  signIn() {
    auth0Client.signIn();
  }

  signOut() {
    console.log('trying to sign out');
    auth0Client.signOut();
  }

  render() {
    const innerView = <ListGroup>
      <ListGroupItem key={1} style={{'textAlign': 'center'}}>
        {!auth0Client.isAuthenticated() &&
          <Button bsStyle="success" href='/signin'>Sign in</Button>
        }
        {auth0Client.isAuthenticated() &&
          <Button bsStyle="danger" onClick={() => this.signOut()}>Sign out</Button>
        }
      </ListGroupItem>
      <ListGroupItem href='/account/settings'>
        Settings
      </ListGroupItem>
    </ListGroup>;

    return (
      <ButtonMenu id='account_navbar' title='My Account' innerView={innerView}>
      </ButtonMenu>
    );
  }
}

export default AccountButton;
