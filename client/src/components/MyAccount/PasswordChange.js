'use strict';

import React from 'react';
import { Link } from 'react-router';
import { Input, Button, Label } from 'semantic-ui-react';
import Form from '../Form';
import crypto from 'crypto';



export default class PasswordChange extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        oldPW:'',
        newPW:'',
        newPWconfirm:'',
        error:'',
        message:"",
        userid:this.props.userid,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    console.log(value)
    this.setState({
      [name]: value
    });

  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.oldPW==='' || this.state.newPW==='' || this.state.newPWconfirm===''){
      this.setState({ error:'Veuillez remplir tous les champs !'});
    }

    else{
      if (this.state.newPW!==this.state.newPWconfirm){
        this.setState({ error:'Les champs nouveau mot de passe et confirmation ne correspondent pas !'});
      }

      else {
        const new1=crypto.createHmac('sha256',this.state.newPW).digest('hex');
        const old1=crypto.createHmac('sha256',this.state.oldPW).digest('hex');
        var url="http://localhost:3001/updatePassword";
        return fetch(url, {
          method: 'POST',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          mode: 'cors',
          body: 'old='+old1+'&new='+new1+'&id='+this.state.userid
        }).then(blob=>blob.json()).then((res)=>{
          console.log(res)
          if(!res.verif){
            this.setState({ error:"L'ancien mot de passe est incorrecte !"})
          }
          else{
            if(res.added){
              this.setState({ message:"Le mot de passe a été changé !"})
            }
            else{
              this.setState({error:"Une erreur s'est produite."})
            }
          }
        })
      }
    }

    event.preventDefault();
  }

  componentDidMount() {

  }

  render() {
    var AlertStyle = { display:'none'}
    const error = this.state.error;
    if (error !== ''){
      AlertStyle = { display:'block'}
    }
    return (
        <div className="Account-PasswordChange">
        <Form onSubmit={this.handleSubmit}>
        <h3> Modifier votre Mot de Passe </h3>
          <div className="Account-OldPassword">
            <label for="oldPW">Ancien mot de passe: </label>
            <Input type="password" name="oldPW" onChange={this.handleChange}/>
          </div>
          <div className="Account-NewPassword">
            <label for="newPW">Nouveau mot de passe: </label><Input type="password" name="newPW" onChange={this.handleChange}/>
          </div>
          <div className="Account-NewPassword-Confirm">
            <label for="newPWconfirm">Confirmation nouveau mot de passe: </label><Input type="password" name="newPWconfirm" onChange={this.handleChange}/>
          </div>
          {this.state.message &&<Label color='green' basic style={AlertStyle} > {this.state.message}  </Label>}
          {error &&<Label color='red' basic style={AlertStyle} > {error}  </Label>}
          <Button type="submit">Envoyer </Button>
          </Form>
        </div>
    );
  }
}
