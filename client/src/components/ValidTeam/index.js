import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class ValidTeam extends Component {

  constructor(props) {
    super(props);

    this.state={
      data: '',
    }

  }

  componentDidMount() {
    var headers = new Headers();
    var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/validTeam', init).then(res => res.json()).then(users => this.setState({ data: users, }));
  }

  render() {
    if (this.state.data !== ''){
      return(
        <BootstrapTable data={ this.state.data } options={ { noDataText: 'Data not found' } }>
          <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true }>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='Nom' dataSort={ true }>Nom</TableHeaderColumn>
          <TableHeaderColumn dataField='Reservation' dataSort={ true }>Reservation</TableHeaderColumn>
          <TableHeaderColumn dataField='Téléphone' dataSort={ true }>Téléphone</TableHeaderColumn>
          <TableHeaderColumn dataField='Mail' dataSort={ true }>Mail</TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      return(
        <p></p>
      );
    }
  }
}
