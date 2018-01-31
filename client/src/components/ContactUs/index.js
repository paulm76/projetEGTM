import React, {Component} from 'react';

export default class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }


  render() {
  	return(
      <div>
        <h1 style={{ paddingLeft: '100px' }}>Nous contacter</h1>
        <br />
        <h2>Adresse mail Escape Team Up : </h2>
    	  <p style={{ paddingLeft: '50px' }}>contactegtm@gmail.com</p>
      </div>
  	);
  }
}