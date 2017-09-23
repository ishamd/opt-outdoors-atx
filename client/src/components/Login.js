import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import PublicNavigation from './PublicNavigation';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      "email": '',
      "password": '',
      "firstName": '',
      "lastName": '',
      "newPassword": '',
      "newEmail": '',
      "signedIn": false
    }

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(event) {
    event.preventDefault();
    //To be done === check for empty values before hitting submit

    var payload = {
      "first": this.state.firstName,
      "last": this.state.lastName,
      "email": this.state.newEmail,
      "password": this.state.newPassword
    }

    axios.post('/register', payload)
    .then(function(response) {
      console.log('response from db:', response);
      if (response.status === 200) {
        console.log("registration successful");
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  handleSignIn(event) {
    event.preventDefault();
    let payload = {
      "email": this.state.email,
      "password": this.state.password
    }

    axios.post('/login', payload)
    .then(response => {
      console.log('login response:', response);
      if (response.data.code === 200) {
        console.log("Login successful");
        let user = {
          id: response.data.user.id,
          admin: response.data.user.admin,
          email: response.data.user.email,
          first: response.data.user.first,
          last: response.data.user.last,
        };
        this.setState({
          signedIn:true,
          user: user,
          events: {}
        })
      } else if (response.data.code === 204) {
        console.log("Username password do not match");
        alert("username password do not match")
      } else {
        console.log("Username does not exist");
        alert("Username does not exist");
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  handleInputChange(event) {
   this.setState({
     [event.target.name]: event.target.value
   });
 }

  render() {
    if (this.state.signedIn) {
      return (<Redirect to={{
        pathname: "/home",
        state: {
          signedIn: this.state.signedIn,
          user: this.state.user,
          events: {}
        }
      }} />)
    }
    return (
      <div>
        <PublicNavigation></PublicNavigation>
        <div>
          <div></div>
          <div></div>
        </div>
        <div className="col-sm-8 offset-sm-2 py-3">
          <div className="py-3">
            <h5>Sign In:</h5>
            <form onSubmit={this.handleSignIn}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input required name="email" type="text" className="form-control" id="email" placeholder="test@gmail.com" onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input required name="password" type="password" className="form-control" id="password" onChange={this.handleInputChange}/>
              </div>
              <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
          </div>
          <div className="py-3">
            <h5>Register:</h5>
            <form onSubmit={this.handleRegister}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input required name="firstName" type="text" className="form-control" id="firstName" onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input required name="lastName" type="text" className="form-control" id="lastName" onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="newEmail">Email</label>
                <input required name="newEmail" type="text" className="form-control" id="newEmail" onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Password</label>
                <input required name="newPassword" type="password" className="form-control" id="newPassword" onChange={this.handleInputChange}/>
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
