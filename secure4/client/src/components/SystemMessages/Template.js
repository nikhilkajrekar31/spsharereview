import React, { Component } from 'react';
import { Grid, Row, Col, Well } from 'react-bootstrap';

class Template extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col smOffset={1} sm={10}>
            <h1>Awww...Don’t Cry.</h1>
            <br/>
            <Well
              style={{
                'textAlign': 'center',
              }}
            >
              {this.props.innerView}
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Template;
