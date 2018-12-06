import React, { Component } from 'react';
import { Grid, Table, Well, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isItemsLoaded': false,
      'isLoadSuccessful': false,
      'items': null,
    };
    this.fetchItems();
  }

  reset() {
    this.setState({
      'isItemsLoaded': false,
      'isLoadSuccessful': false,
      'items': null,
    }, () => {
      this.fetchItems();
    });
  }

  fetchItems() {
    this.props.fetchItems()
      .then(items => {
        this.setState({
          'isItemsLoaded': true,
          'isLoadSuccessful': true,
          'items': items,
        });
      })
      .catch(err => {
        this.setState({
          'isItemsLoaded': true,
          'isLoadSuccessful': false,
        });
      });
  }

  message() {
    if (this.state.isItemsLoaded) {
      if (this.state.isLoadSuccessful) {
        if (!this.state.items.length > 0) {
          return <p>No Items to show.</p>;
        }
      } else {
        return <p>Something went wrong. Please try Again.</p>;
      }
    } else {
      return <div>
        <p>Loading Items... <FontAwesomeIcon icon='spinner' spin/></p>
      </div>;
    }
  }

  rowsFor(items) {
    const rows = [];
    for (let i=0; i<items.length; i++) {
      rows.push(
        this.props.rowFor(i, items[i])
      );
    }
    return rows;
  }

  itemsTableHeaderView() {
    const tags = [];
    const fields = this.props.headerFields;
    for (let i=0; i<fields.length; i++) {
      tags.push(
        <th key={i+1}>
          { fields[i] }
        </th>
      );
    }
    return <tr key={0}>
      <th key={0}>#</th>
      {tags}
    </tr>;
  }

  viewForItems() {
    return <Table striped bordered condensed hover>
      <thead>
        { this.itemsTableHeaderView() }
      </thead>
      <tbody>
        { this.rowsFor(this.state.items) }
      </tbody>
    </Table>;
  }

  view() {
    if (this.state.isItemsLoaded &&
      this.state.isLoadSuccessful &&
      this.state.items.length > 0) {
      return this.viewForItems();
    } else {
      return <Row
        style={{
          'paddingTop': '15rem',
        }}
      >
        <Col smOffset={1} sm={10}>
          <Well
            style={{
              'textAlign': 'center',
            }}
          >
            {this.message()}
          </Well>
        </Col>
      </Row>;
    }
  }

  render() {
    return (
      <Grid
        style={{
          'width': 'auto',
        }}
      >
        <div
          style={{
            'overflowY': 'scroll',
            'height': '40rem',
          }}
        >
          { this.view() }
        </div>
      </Grid>
    );
  }
}

export default Main;
