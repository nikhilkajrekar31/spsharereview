import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Alert, Glyphicon, FormGroup, FormControl, ControlLabel, Overlay } from 'react-bootstrap';
import { callCallbackIfExistsInObject } from './../global/utilities';
class TextField extends Component {
  constructor(props) {
    super(props);
    this.setValidationMode();
    this.state = {
      'isClearTextButtonShowing': false,
      'value': this.props.value,
      'isShowingOverlayMessage': false,
    };
  }

  clearTextFieldText() {
    const textField = ReactDOM.findDOMNode(this.textFieldRef.current);
    textField.focus();
    this.setState({
      'isClearTextButtonShowing': false,
      'value': '',
    });
    callCallbackIfExistsInObject(
      'onClear',
      this.props,
    );
  }

  textFieldTextChanged(e) {
    const text = e.target.value;
    const state = {
      'value': text,
    };
    if (text !== '') {
      state.isClearTextButtonShowing = true;
    } else {
      state.isClearTextButtonShowing = false;
    }
    this.setState({
      ...state,
    }, () => {
      this.setValidationMessage();
    });
    callCallbackIfExistsInObject(
      'valueChangedTo',
      this.props,
      text
    );
  }

  validateWithWhiteList(whiteList) {
    const test = whiteList.test(this.state.value);
    if (test) {
      return true;
    }
    return false;
  }

  validationMessageForWhiteList(whiteList) {
    const message = 'only allowed characters are: ' + whiteList + '.';
    return message;

  }

  validateWithBlackList(blackList) {
    const test = blackList.test(this.state.value);
    if (test) {
      return false;
    }
    return true;
  }

  validationMessageForBlackList(blackList) {
    const message = 'Field has invalid characters: ' + blackList.source;
    return message;
  }


  setValidationMode() {
    this.validationList = [];
    this.validateWith = () => true;
    this.validationMessage = () => null;
    if (this.props.whiteList) {
      this.validationList = this.props.whiteList;
      this.validateWith = this.validateWithWhiteList;
      this.validationMessage = this.validationMessageForWhiteList;
    } else if (this.props.blackList) {
      this.validationList = this.props.blackList;
      this.validateWith = this.validateWithBlackList;
      this.validationMessage = this.validationMessageForBlackList;
    }
  }

  setValidationMessage() {
    const isValid = this.validateWith(this.validationList);
    if (isValid) {
      if (this.state.isShowingOverlayMessage) {
        this.setState({
          'isShowingOverlayMessage': false,
        });
      }
    } else {
      if (!this.state.isShowingOverlayMessage) {
        this.setState({
          'isShowingOverlayMessage': true,
        });
      }
    }
  }

  validate(self) {
    const isValid = self.validateWith(self.validationList);
    let result;
    if (isValid) {
      result = null;
    } else {
      result = 'error';
    }
    return result;
  }

  textFieldKeyPressed(e) {
    const text = e.target.value.trim();
    if (text !== '') {
      if(e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        e.target.blur();
        this.setState({
          'value': text,
        });
        callCallbackIfExistsInObject(
          'enterPressedWith',
          this.props,
          text
        );

      }
    }
  }

  errorOverlay({ message, parent }) {
    return (
      <Alert
        style={{
          'position': 'absolute',
          'width': '100%',
          'height': '100%',
        }}
        bsStyle='danger'
        onDismiss={() => {
          parent.setState({
            'isShowingOverlayMessage': false,
          });
        }}
      >
        <strong>
          Invalid Input!
        </strong>
        <p>
          { message }
        </p>
      </Alert>
    );
  }

  render() {
    const ErrorOverlay = this.errorOverlay;
    const message = this.validationMessage(this.validationList);
    this.textFieldFormRef = React.createRef();
    this.textFieldRef = React.createRef();
    return (
      <div>
        <Overlay
          show={this.state.isShowingOverlayMessage}
          placement='bottom'
          container={this}
          target={this}
        >
          <ErrorOverlay
            message={message}
            parent={this}
          />
        </Overlay>
        <FormGroup
          controlId={this.props.controlId}
          validationState={this.validate(this)}
          ref={this.textFieldFormRef}
          className="has-feedback"
          onKeyDown={
            e =>
              this.textFieldKeyPressed(e)
          }
        >
          <ControlLabel>{this.props.label}</ControlLabel>
          <FormControl
            onChange={
              e =>
                this.textFieldTextChanged(e)
            }
            label='hello'
            value={this.state.value}
            ref={this.textFieldRef}
            type="text"
            placeholder={this.props.placeholder}
          />
          {this.state.isClearTextButtonShowing &&
            <Glyphicon
              onClick={
                () =>
                  this.clearTextFieldText()
              }
              className="form-control-feedback"
              glyph="remove-circle"
              style={
                {
                  'cursor': 'pointer',
                  'zIndex': '10',
                  'pointerEvents': 'auto'
                }
              }
            />
          }
        </FormGroup>
      </div>
    );
  }
}

export default TextField;
