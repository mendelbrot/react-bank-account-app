import React from 'react';
const BASE_URL = 'http://localhost:51146/api/clientaccounts';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      clientAccounts: [], 
      clientAccount: null, 
      clientAccountDetails: null
    };
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getDetails = this.getDetails.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    const URL = BASE_URL;

    fetch(URL).then(response => response.json())
      .then((data) => {
        this.setState({ clientAccounts: data });
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  create() {
    const URL = BASE_URL;

    var clientID = this.clientIDInput.value;
    this.clientIDInput.value = '';
    var accountID = this.accountIDInput.value;
    this.accountIDInput.value = '';
    var balance = this.balanceInput.value;
    this.balanceInput.value = '';

    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'clientID': clientID,
        'accountID': accountID,
        'balance': balance
      })
    })
      .then(response => response.json())
      .then((json) => {
        console.log(JSON.stringify(json));
        this.getAll();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  update() {

  }

  delete(item) {
    const URL = BASE_URL + '/delete'
      + '?clientid=' + item.clientID
      + '&accountid=' + item.accountID;
    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json));
        this.getAll();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getDetails() {

  }

  render() {
    return (
      <div>
        <ul>
          {this.state.clientAccounts.map((item, index) => (
            <li key={index}>
              ClientID: {item.clientID}, AccountID: {item.accountID} , Balance: {item.balance} 
              <button onClick={(e) => this.delete(item)}>Delete</button> 
            </li>
          ))}
        </ul>
        <h3>Create New Client Account</h3>
        Client ID:<input type="text" ref={(element) => this.clientIDInput = element} /><br/>
        Account ID:<input type="text" ref={(element) => this.accountIDInput = element} /><br />
        Balance:<input type="text" ref={(element) => this.balanceInput = element} /><br />
        <button onClick={this.create}>Create</button>
      </div>
    )
  }
}
export default App;
