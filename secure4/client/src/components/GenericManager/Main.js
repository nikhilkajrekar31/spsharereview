import React, { Component } from 'react';
import { Glyphicon, Modal, Navbar, Panel, Button } from 'react-bootstrap';
import './style.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isAddModalShowing': false,
    };
    this.listView = React.createRef();
  }

  addButtonClicked() {
    this.forceUpdate();
    this.setState({
      'isAddModalShowing': true,
    });
  }

  doneAdding() {
    this.setState({
      'isAddModalShowing': false,
    });
    this.reloadData();
  }

  reloadData() {
    const component = this.listView.current;
    if (!component.listView) {
      component.getWrappedInstance().reset();
    } else {
      component.reset();
    }
  }

  addModal() {
    const AddView = this.props.addView;
    return <Modal
      show={this.state.isAddModalShowing}
      onHide={() => {
        this.setState({
          'isAddModalShowing': false,
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {this.props.addViewTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddView
          onAdd={() => this.doneAdding()}
        />
      </Modal.Body>
    </Modal>;
  }

  render() {
    const ListView = this.props.listView;
    return (
      <div>
        { this.props.addView && this.addModal() }
        <Panel>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                {this.props.title}
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form
                pullRight
              >
                <Button
                  onClick={() => {
                    this.reloadData();
                  }}
                >
                  <Glyphicon glyph="refresh"/>
                </Button>
                {' '}
                { this.props.addView &&
                  <Button
                    bsStyle='info'
                    onClick={() => this.addButtonClicked()}
                  >
                    <Glyphicon glyph="plus"/>
                  </Button>
                }
                {' '}
              </Navbar.Form>
            </Navbar.Collapse>
          </Navbar>
          <ListView
            ref={this.listView}
          />
        </Panel>
      </div>
    );
  }
}

export default Main;
