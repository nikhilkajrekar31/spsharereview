import React, { Component } from 'react';
import { Grid, Row, Col, Button, Alert } from 'react-bootstrap';
import user from '../../../models/User';
import { AlertList } from 'react-bs-notifier';
import alertsStateManager from '../../../models/stores/Alerts';
import { connect } from 'react-redux';
import TextField from '../../TextField';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email_address': '',
    };
  }

  getValidationStateForEmailAddress() {
    return null
  }

  render() {
    return (
      <div>
        <AlertList
          position='top-right'
          timeout={this.props.alertTimeout}
          onDismiss={(a) => this.props.removeAlert(a)}
          alerts={this.props.alerts}
        >
        </AlertList>
        <Grid>
          <h1>SignIn</h1>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <form>
            <Row>
              <Col sm={6}>
                <TextField
                  controlId='email_address'
                  label='Email Address'
                  value={this.state.email}
                  validationState={this.getValidationStateForEmailAddress()}
                  valueChangedTo={(text) => this.nameChangedTo(text)}
                  onClear={() => this.nameChangedTo('')}
                  enterPressedWith={() => this.updateData()}
                />
              </Col>
            </Row>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Row>
              <Col sm={6}>
                <Button
                  disabled={this.state.isSubmitDisabled}
                  bsStyle="primary"
                  onClick={() => this.updateData()}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </form>
        </Grid>
      </div>
    );
  }
}

export default connect(
  alertsStateManager.mapStateToProps(),
  alertsStateManager.mapDispatchToProps()
)(Main);
