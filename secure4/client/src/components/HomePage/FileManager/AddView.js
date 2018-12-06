import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, ProgressBar, Button } from 'react-bootstrap';
import user from '../../../models/User';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isUploadButtonDisabled': true,
      'files': null,
      'progress': 0,
    };
  }

  selectedFiles(files) {
    this.setState({
      'files': files,
      'isUploadButtonDisabled': false,
    });
  }

  upload() {
    user.uploadFiles(this.state.files, (e) => {
      const progress = e.loaded / e.total * 100;
      this.setState({
        'progress': Math.round(progress),
      });
    }).then(() => this.props.onAdd());
    this.setState({
      'isUploadButtonDisabled': true,
    });

  }

  render() {
    return (
      <div>
        <form>
          <FormGroup
            controlId='file'
          >
            <ControlLabel>
              Select File
            </ControlLabel>
            <br/>
            <FormControl
              type='file'
              multiple
              onChange={(e) => this.selectedFiles(e.target.files)}
            >
            </FormControl>
          </FormGroup>
          <br/>
          <ProgressBar
            active
            now={this.state.progress}
            label={this.state.progress+'%'}
          />
          <br/>
          <hr/>
          <Button
            bsStyle="primary"
            disabled={this.state.isUploadButtonDisabled}
            onClick={() => this.upload()}
          >
            Upload
          </Button>
        </form>
      </div>
    );
  }
}

export default Main;
