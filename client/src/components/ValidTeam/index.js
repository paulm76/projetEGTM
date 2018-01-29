import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table';
import { Button } from 'semantic-ui-react';

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
        <BootstrapTable data={ this.state.data } options={ options } deleteRow={ true } selectRow={ selectRowProp }>
          <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true } width="7.5%">ID</TableHeaderColumn>
          <TableHeaderColumn dataField='adminLastName' dataSort={true}>Createur</TableHeaderColumn>
          <TableHeaderColumn dataField='Reservation' dataSort={ true }>Reservation</TableHeaderColumn>
          <TableHeaderColumn dataField='Mail_reservation' dataSort={ true }>Mail de réservation</TableHeaderColumn>
          <TableHeaderColumn dataField='Nom' dataSort={ true }>Nom</TableHeaderColumn>
          <TableHeaderColumn dataField='Téléphone' dataSort={ true }>Téléphone</TableHeaderColumn>
        </BootstrapTable>
      );
    } else {
      return(
        <p></p>
      );
    }
  }
}


const options = {
  onDeleteRow: handleDeleteRow,
  noDataText: 'Data not found',
  onRowClick: handleClickRow,
  deleteBtn: createCustomButton,
}

const selectRowProp = {
  mode: 'checkbox'
}

function handleDeleteRow(rowKeys){
  var length = rowKeys.length;
  var query = "";
  for (var i=0; i<length; i++){
    query += rowKeys[i].toString() + ',';
  }
  query = query.substring(0, query.length-1);
  var headers = new Headers();
  var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
  fetch('http://localhost:3001/validTeam?teamId=' + query, init).then(res => res.json()).then(users => this.setState({ data: users, }));
}

function handleClickRow(rowKeys){
  window.open("http://localhost:3000/team?teamId=" + rowKeys.id);
}

function createCustomButton(){
  return (
    <DeleteButton
      btnText='Valider'
      style={{ color: 'white', backgroundColor: 'black', borderColor: 'black' }}
    />
  );
}