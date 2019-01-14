import React from 'react';

const BASE_URL = 'http://localhost:51146/api/clientaccounts';

const fetchService = {
  getAll(callback, errorCallback) {
    const URL = BASE_URL;

    fetch(URL).then(response => response.json())
      .then((data) => callback(data))
      .catch((error) => errorCallback(error));
  },

  create() {
    const URL = BASE_URL;

    var clientID = this.clientIDCreateInput.value;
    this.clientIDCreateInput.value = '';
    var accountID = this.accountIDCreateInput.value;
    this.accountIDCreateInput.value = '';
    var balance = this.balanceCreateInput.value;
    this.balanceCreateInput.value = '';

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
        this.getDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  update(balance) {
    const URL = BASE_URL
    fetch(URL, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'clientID': this.state.detailsItem.clientID,
        'accountID': this.state.detailsItem.accountID,
        'balance': balance
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json));
        this.getAll();
        this.getDetails();
      })
      .catch(function (error) {
        console.log(error);
      });
  },

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
        this.getDetails();
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  getDetails() {
    var clientID = this.clientIDDetailsInput.value;
    var accountID = this.accountIDDetailsInput.value;

    const URL = BASE_URL + '/getdetails'
      + '?clientid=' + clientID
      + '&accountid=' + accountID;

    fetch(URL).then(response => response.json())
      .then((data) => {
        this.setState({ detailsItem: data });
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

function DetailsView(props) {

  var balanceUpdateInput;

  console.log(props.item);

  if (props.item != null) {
    return (
      <div>

        <hr/>

        First Name: {props.item.firstName} <br/>
        Last Name: {props.item.lastName} <br />
        Account Description: {props.item.accountDescription} <br />
        Balance: {props.item.balance} <br />

        <h3>Edit Balance:</h3>
        Balance:<input type="text" ref={(element) => balanceUpdateInput = element} /><br />
        <button onClick={() => props.update(balanceUpdateInput.value)}>Update</button>

        <hr/>

      </div>
    );
  } else {
    return null;
  }
  
};

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      clientAccounts: [], 
      detailsItem: null
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

  render() {
    return (
      <div>

        <h2>Show Client Account Details/Update</h2>
        Client ID:<input type="text" ref={(element) => this.clientIDDetailsInput = element} /><br />
        Account ID:<input type="text" ref={(element) => this.accountIDDetailsInput = element} /><br />
        <button onClick={this.getDetails}>Show/Update</button>
        <DetailsView item={this.state.detailsItem} update={this.update}/>

        <h2>Create New Client Account</h2>
        Client ID:<input type="text" ref={(element) => this.clientIDCreateInput = element} /><br />
        Account ID:<input type="text" ref={(element) => this.accountIDCreateInput = element} /><br />
        Balance:<input type="text" ref={(element) => this.balanceCreateInput = element} /><br />
        <button onClick={this.create}>Create</button>
        
        <h2>Client Accounts List</h2>
        <ul>
          {this.state.clientAccounts.map((item, index) => (
            <li key={index}>
              ClientID: {item.clientID}, AccountID: {item.accountID} , Balance: {item.balance}
              <button onClick={(e) => this.delete(item)}>Show Details/Update</button>
              <button onClick={(e) => this.delete(item)}>Delete</button>
            </li>
          ))}
        </ul>

      </div>
    )
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

    var clientID = this.clientIDCreateInput.value;
    this.clientIDCreateInput.value = '';
    var accountID = this.accountIDCreateInput.value;
    this.accountIDCreateInput.value = '';
    var balance = this.balanceCreateInput.value;
    this.balanceCreateInput.value = '';

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
        this.getDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  update(balance) {
    const URL = BASE_URL
    fetch(URL, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'clientID': this.state.detailsItem.clientID,
        'accountID': this.state.detailsItem.accountID,
        'balance': balance
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json));
        this.getAll();
        this.getDetails();
      })
      .catch(function (error) {
        console.log(error);
    });
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
        this.getDetails();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getDetails() {
    var clientID = this.clientIDDetailsInput.value;
    var accountID = this.accountIDDetailsInput.value;

    const URL = BASE_URL + '/getdetails'
    + '?clientid=' + clientID
    + '&accountid=' + accountID;

    fetch(URL).then(response => response.json())
      .then((data) => {
        this.setState({ detailsItem: data });
        console.log(JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });

  }
}
export default App;


