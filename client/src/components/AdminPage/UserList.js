
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


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
    return(
    <BootstrapTable data={ this.state.data } options={ { noDataText: 'This is custom text for empty data' } }>
      <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true }>ID</TableHeaderColumn>
      <TableHeaderColumn dataField='Nom' dataSort={ true }>Nom</TableHeaderColumn>
      <TableHeaderColumn dataField='Prenom' dataSort={ true }>Prénom</TableHeaderColumn>
  </BootstrapTable>

  );

  }
}
