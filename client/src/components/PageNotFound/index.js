import React, { Component } from 'react';
import {Link}  from 'react-router-dom';

export default class PageNotFound extends React.Component {
  render(){
      return(
        <div className="not-found">
          <h1>Erreur 404 : page non trouvée </h1>
          <Link to='/' > Retour à la page principale </Link>
        </div>
    )
  }
}
