import React, { Component } from 'react';
import { Input, Button, Grid, Checkbox, Icon, Container, Message, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import queryString from 'query-string';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Card from 'react-credit-cards';
import request from 'request';
import Form from '../Form';
import MaskedInput from 'react-maskedinput';


class PayOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid:1,
      Iban:'',
      bankAccount:'',
      info:{},
      loading:false,
      AddressLine1:'',
      AddressLine2:'',
      City:'',
      Region:'',
      PostalCode:'',
      Country:'',
      step:0,
      message:'',
      error:'',
      visible:false,
      cagnotte:0,
      isLoading:true
     };

     this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    var headers = new Headers()
    var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
    fetch('http://localhost:3001/mangopay/getBankAccount?userid=' + this.state.userid, init).then(blob => blob.json())
    .then(res => {
      this.setState({ bankAccount: res.bankAccount })
      if (res.bankAccount !== ''){
        this.setState({ step: 1, cagnotte:res.cagnotte })
      }
      this.setState({isLoading:false})
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({loading:true})
    const { Iban,
      AddressLine1,
      AddressLine2,
      City,
      Region,
      PostalCode,
      Country,
    } = this.state;
    if (this.state.step===0){
      var headers = new Headers();
      headers.append('Content-Type','application/x-www-form-urlencoded')
      var options = {
              url: 'http://localhost:3001/mangopay/createBankAccount',
              headers: headers,
              form: {
                  "userid":this.state.userid,
                  'iban':Iban.replace(/_/g,'').replace(/ /g,''),
                  "AddressLine1":AddressLine1,
                  "AddressLine2":AddressLine2,
                  "City":City,
                  "Region":Region,
                  "PostalCode":PostalCode,
                  "Country":Country
              }
          };
      request.post(options, (err, httpResponse, body)=>{
        const bankAccount = body;
        if (!err && !bankAccount.errors){
          this.setState({bankAccount:bankAccount,step:1,message:"Vos informations ont été correctement enregistrées",loading:false,visible:true,error:''})
          var headers = new Headers();
          var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
        }
        else{
          this.setState({error:"Une erreur s'est produite, veuillez vérifier les données saisies",loading:false,visible:true,message:''})
        }
      });
    }
    if (this.state.step===1){
      var headers = new Headers();
      var init = { method: 'GET', header: 'headers', mode: 'cors', cache: 'default' };
      fetch(`http://localhost:3001/mangopay/createPayOut?userid=${this.state.userid}`,init).then(blob => blob.json())
      .then(res=> {
        if (res.Status==='SUCCEEDED' || res.Status==='CREATED'){
          this.setState({message:"Le virement a été créé",loading:false,visible:true,error:'',cagnotte:0})
        }
        else{
          console.log(res)
          this.setState({error:"Une erreur s'est produite.",loading:false,visible:true,message:''})
        }
      }).catch(err => {
        console.log(err)
        this.setState({error:"Une erreur s'est produite.",loading:false,visible:true,message:''})
      })
    }


  }

  render() {

    const { Iban,
      isSaving,
      loading,
      AddressLine1,
      AddressLine2,
      City,
      Region,
      PostalCode,
      Country,
      message,
      error,
      visible,
      info,
      bankAccount,
    } = this.state

    const isInvalid =
      Iban === '' ||
      AddressLine1 === '' ||
      City === '' ||
      Region === ''||
      PostalCode === ''||
      Country === '';

      console.log(this.state)

    return (
      <div>
      {this.state.isLoading && <Loader />}
      {!this.state.isLoading && <Form onSubmit={this.onSubmit} style={{padding:'20px',margin:'20px'}}>

      <h1> {"Vider votre Cagnotte"} </h1>
      {error!=='' && visible && <Message onDismiss={() => this.setState({ visible: false })} negative>{error}</Message>}
      {message!=='' && visible && <Message onDismiss={() => this.setState({ visible: false })} success>{message}</Message>}

      {this.state.step===0 &&
        <div>
      <h2>Veuillez rentrer un Compte Bancaire et vos Données Personelles </h2>
      <MaskedInput value={Iban} style={{fontSize:'28px', textAlign:'center'}}
      mask="AA11 1111 1111 1111 1111 #### 111"
      name="iban" style={{padding:'4px', minWidth:'60%'}}
      onChange={event => this.setState({ Iban: event.target.value })}/> <br/>
      <Input style={{padding:'4px', minWidth:'60%'}}
        value={AddressLine1}
        onChange={event => this.setState({ AddressLine1: event.target.value })}
        type="text"
        placeholder="Addresse ligne 1"
      /> <br/>
      <Input style={{padding:'4px', minWidth:'60%'}}
        value={AddressLine2}
        onChange={event => this.setState({ AddressLine2: event.target.value })}
        type="text"
        placeholder="Addresse ligne 2"
      /> <br/>
      <Input style={{padding:'4px', minWidth:'30%'}}
        value={City}
        onChange={event => this.setState({ City: event.target.value })}
        type="text"
        placeholder="Ville"
      />
      <Input style={{padding:'4px', minWidth:'30%'}}
        value={PostalCode}
        onChange={event => this.setState({PostalCode: event.target.value })}
        type="text"
        placeholder="Code Postal"
      /> <br/>
      <Input style={{padding:'4px',minWidth:'30%'}}
        value={Region}
        onChange={event => this.setState({Region: event.target.value })}
        type="text"
        placeholder="Région"
      />

      <Input style={{padding:'4px', minWidth:'30%'}}
        name="text"
        value={Country}
        onChange={event => this.setState({Country: event.target.value })}
        type="text"
        placeholder="Pays"
      /><br/>

          <Button disabled={isInvalid} loading={loading} animated type='submit'>
              <Button.Content visible>Enregistrer</Button.Content>
              <Button.Content hidden>
                <Icon name='right arrow' />
              </Button.Content>
            </Button>
            </div>
          }
      {this.state.step===1 &&
        <div>
        <p>Votre cagnotte sera virée vers</p>
        <Button disabled={this.state.step===0} animated onClick={()=>this.setState({step:0})} floated='right'>
          <Button.Content visible>Modifier</Button.Content>
          <Button.Content hidden>
            <Icon name='setting' />
          </Button.Content>
        </Button>
        <h3>{bankAccount.OwnerName}</h3>
        <h3>{bankAccount.IBAN}</h3>
        <br/>
        <p> `Votre Cagnotte s'élève à `<b>{this.state.cagnotte} €</b></p>


      <Button disabled={this.state.cagnotte===0} loading={this.state.loading} animated type='submit' floated='right'>
        <Button.Content visible>Vider</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </Button>
      </div>}
      </Form>}
      </div>

    );
  }
}

export default PayOut;
