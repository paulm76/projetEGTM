import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Form from '../Form';
import crypto from 'crypto'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  logged:false,
};

export default class Credentials extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;
    const hash = crypto.createHmac('sha256', `${email}:${password}`).digest('hex');
    console.log(crypto.createHmac('sha256', 'auroreETU:4ur0r3ETU').digest('hex'));
    if (hash==='405e2f236edb18ea4cdca49c2d1bba89edd9a011687c3413c1570b9dc42005a7'){
      this.setState({ logged:true })
      this.props.OnLoginValided();
    }

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          type="text"
          placeholder="Addresse mail"
        />
        <Input
          value={password}
          onChange={event => this.setState({ password: event.target.value })}
          type="password"
          placeholder="Mot de passe"
        />
        <Button disabled={isInvalid} type="submit">
          Se connecter
        </Button>
        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}
