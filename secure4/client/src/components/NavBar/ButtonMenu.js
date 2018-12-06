import React, { Component } from 'react';
import './ButtonMenu.css';
import { NavDropdown } from 'react-bootstrap';
class ButtonMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  handleOpen() {
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <NavDropdown
        onMouseEnter = { () => this.handleOpen() }
        onMouseLeave = { () => this.handleClose() }
        open={ this.state.isOpen }
        eventKey={3}
        title={ this.props.title }
        id={ this.props.id }
        onToggle={()=>{}}
        href={this.props.href}
      >
        {this.props.innerView}
      </NavDropdown>
    );
  }
}

export default ButtonMenu;
