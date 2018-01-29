import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class CurrentTeam extends Component {

  constructor(props) {
    super(props);

    this.state={
      data: '',
    }

  }

  componentDidMount() {
    var headers = new Headers();
    var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/currentTeam', init).then(res => res.json()).then(users => this.setState({ data: users, }));
  }

  render() {
    if (this.state.data !== ''){
      var length = this.state.data.length;
      for (var i=0; i<length; i++){
        this.state.data[i].Date = this.state.data[i].Date.substring(0, this.state.data[i].Date.length-8);
        this.state.data[i].Date = this.state.data[i].Date.replace('T',' ');
      }
      return(
        <BootstrapTable data={ this.state.data } options={ options }>
          <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true } width="5%">ID</TableHeaderColumn>
          <TableHeaderColumn dataField='adminLastName' dataSort={true}>Createur</TableHeaderColumn>
          <TableHeaderColumn dataField='Reservation' dataSort={ true }>Reservation</TableHeaderColumn>
          <TableHeaderColumn dataField='Nom' dataSort={ true }>Escape</TableHeaderColumn>
          <TableHeaderColumn dataField='Room' dataSort={ true }>Room</TableHeaderColumn>
          <TableHeaderColumn dataField='Date' dataSort={ true }>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='Nb_joueurs' width="5%">Nb joueur</TableHeaderColumn>
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
  noDataText: 'Data not found',
  onRowClick: handleClickRow,
}

function handleClickRow(rowKeys){
  window.open("http://localhost:3000/team?teamId=" + rowKeys.id);
}