import React, { Component } from 'react';
import { Grid, Row, Col, Button, Alert } from 'react-bootstrap';
import user from '../../../models/User';
import { AlertList } from 'react-bs-notifier';
import { mapDispatchToProps, mapStateToProps } from '../../../models/stores/Main';
import { connect } from 'react-redux';
import TextField from '../../TextField';
import { appSecurity } from '../../../global/constants';
import UsersManager from './UsersManager/Main';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isSubmitDisabled': true,
      'name': user.info.name,
    };
  }

  nameChangedTo(name) {
    this.setState({
      'name': name,
      'isSubmitDisabled': false,
    });
  }

  updateDataAtServer(data) {
    return new Promise((resolve, reject) => {
      user.updateTo(data)
        .then((message) => {
          this.props.addAlert({
            'message': message,
            'type': 'success',
            'headline': 'Changes Saved!'
          });
          resolve();
        })
        .catch((error) => {
          this.props.addAlert({
            'message': error,
            'type': 'danger',
            'headline': 'Try Again!'
          });
          reject();
        });
    });
  }

  getFormData() {
    return {
      'name': this.state.name,
    };
  }

  updateData() {
    if (this.state.isSubmitDisabled) {
      return;
    }
    this.setState({
      'isSubmitDisabled': true,
    }, () => {
      this.updateDataAtServer(this.getFormData())
        .catch(() => {
          this.setState({
            'isSubmitDisabled': false,
          });
        });
    });
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
        {user.info.isNewUser &&
          <Alert bsStyle="warning">
            Welcome. Please set your <strong>name</strong>.
          </Alert>
        }
        <Grid>
          <h1>Settings</h1>
          <br/>
          <br/>
          <br/>
          <br/>
          {user.isAdmin() &&
            <Row>
              <UsersManager/>
            </Row>
          }
          <br/>
          <form>
            <Row>
              <Col sm={6}>
                <TextField
                  controlId='name'
                  label='Name'
                  value={this.state.name}
                  blackList={appSecurity.getNameBlackList()}
                  valueChangedTo={(text) => this.nameChangedTo(text)}
                  onClear={() => this.nameChangedTo('')}
                  enterPressedWith={() => this.updateData()}
                />
              </Col>
            </Row>
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
  mapStateToProps,
  mapDispatchToProps
)(Main);
