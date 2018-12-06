import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { appInfo } from './../../global/constants';
import AccountButton from './AccountButton';
import {withRouter} from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>{appInfo.name}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <AccountButton></AccountButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Main);
