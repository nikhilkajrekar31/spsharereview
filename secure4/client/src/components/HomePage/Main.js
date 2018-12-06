import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import user from '../../models/User';
import FileManager from './FileManager/Main';
import GroupsManager from './GroupsManager/Main';

class Main extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <h1>
              Hi {user.info.name} ({user.info.roles}),
            </h1>
          </Row>
          <br/>
          <Row>
            <Col sm={6}>
              <FileManager/>
            </Col>
            <Col sm={6}>
              <GroupsManager/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Main;
