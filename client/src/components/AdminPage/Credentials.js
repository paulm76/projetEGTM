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
    if (hash==='3abca5bbd15789ecccdcdf0f7ba1747e8b53a893ab0f9620efd82db753e642c2'){
      console.log('oui')
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
          placeholder="Email Address"
        />
        <Input
          value={password}
          onChange={event => this.setState({ password: event.target.value })}
          type="password"
          placeholder="Password"
        />
        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>
        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}
