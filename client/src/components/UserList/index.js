import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


export default class UserList extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      data:'',
    }
  }

  componentDidMount() {
    var headers = new Headers();
    var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/users/', init).then(res => res.json()).then(users => this.setState({ data: users, }));
  }

  render() {
    var length = this.state.data.length;

    for (var i=0; i<length; i++){
      if(this.state.data[i].Date_naissance){
      this.state.data[i].Date_naissance = this.state.data[i].Date_naissance.substring(0, this.state.data[i].Date_naissance.length-8);
      this.state.data[i].Date_naissance = this.state.data[i].Date_naissance.replace('T',' ');
      this.state.data[i].Date_inscription = this.state.data[i].Date_inscription.substring(0, this.state.data[i].Date_inscription.length-8);
      this.state.data[i].Date_inscription = this.state.data[i].Date_inscription.replace('T',' ');
      }
    }

    return(
    <BootstrapTable data={ this.state.data } options={ options }>
      <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true } width="5%">ID</TableHeaderColumn>
      <TableHeaderColumn dataField='Nom' dataSort={ true }>Nom</TableHeaderColumn>
      <TableHeaderColumn dataField='Prenom' dataSort={ true }>Prénom</TableHeaderColumn>
      <TableHeaderColumn dataField='Date_naissance' dataSort={ true }>Naissance</TableHeaderColumn>
      <TableHeaderColumn dataField='Mail' dataSort={ true }>Mail</TableHeaderColumn>
      <TableHeaderColumn dataField='Date_inscription' dataSort={ true }>Inscription</TableHeaderColumn>
      <TableHeaderColumn dataField='Nb_parties' dataSort={ true }>Parties jouées</TableHeaderColumn>
    </BootstrapTable>

  );
  }
}

const options = {
  noDataText: 'Data not found',
  onRowClick: handleClickRow,
}

function handleClickRow(rowKeys){
  console.log(rowKeys.id);
}
