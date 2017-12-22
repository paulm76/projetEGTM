import React from 'react';
import mangopay from 'mangopay2-nodejs-sdk'


class MangopayTest extends React.Component {
  constructor(props) {
    super(props);

    this.createUser = this.createUser.bind(this);
  }

  createUser(){
    var api = new mangopay({
        clientId: 'sdk-unit-tests',
        clientPassword: 'cqFfFrWfCcb7UadHNxx2C9Lo6Djw8ZduLi7J9USTmu8bhxxpju'
    });

    var myUser = new api.models.UserLegal({
        Name: 'MangoPay',
        Email: 'info@mangopay.com',
        LegalPersonType: 'BUSINESS',
        LegalRepresentativeFirstName: 'Mango',
        LegalRepresentativeLastName: 'Pay',
        LegalRepresentativeEmail: 'mango@mangopay.com',
        HeadquartersAddress: new api.models.Address({
            AddressLine1: "4101 Reservoir Rd NW",
            AddressLine2: "",
            City: "Washington",
            Region: "District of Columbia",
            PostalCode: "20007",
            Country: "US"
        }),
        LegalRepresentativeBirthday: 1300186358,
        LegalRepresentativeNationality: 'FR',
        LegalRepresentativeCountryOfResidence: 'FR',
        Tag: 'custom tag'
    });

    api.Users.create(myUser).then(function(){
        // Output the created user data to console
        console.log(myUser.Name + ' user created at ' + myUser.CreationDate);
    });

    api.Users.create({
        Name: 'MangoPay',
        Email: 'info@mangopay.com',
        LegalPersonType: 'BUSINESS',
        LegalRepresentativeFirstName: 'Mango',
        LegalRepresentativeLastName: 'Pay',
        LegalRepresentativeEmail: 'mango@mangopay.com',
        PersonType: "LEGAL",
        HeadquartersAddress: {
            "AddressLine1": "4101 Reservoir Rd NW",
            "AddressLine2": "",
            "City": "Washington",
            "Region": "District of Columbia",
            "PostalCode": "20007",
            "Country": "US"
        },
        LegalRepresentativeBirthday: 1300186358,
        LegalRepresentativeNationality: 'FR',
        LegalRepresentativeCountryOfResidence: 'FR',
        Tag: 'custom tag'
    }, function(myOtherUser) {
        // Output the created user data to console
        console.log(myOtherUser.Name + ' user created at ' + myOtherUser.CreationDate);
    });
  }

  render() {
    return (
      <input type='button' onclick={this.createUser()} value='MangoPay'/>
    )
  }
}

export default MangopayTest;
