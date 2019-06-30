import React, { Component } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { userActions } from '../../_actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    // reset login status
    // this.props.dispatch(userActions.logout());

    this.state = {
        username: '',
        password: '',
        submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleUserName = (event) => {
  //   console.log('handleusername');
  //   this.setState({inputID: event.target.value});
  // }
  // handlePassWord = (event) => {
  //   console.log('handlepassword');
  //   this.setState({inputPassWord: event.target.value});
  // }

  handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
      e.preventDefault();
      console.log("handle submit");
      this.setState({ submitted: true });
      const { username, password } = this.state;
      const { dispatch } = this.props;
      if (username && password) {
          dispatch(userActions.login(username, password));
      }
  }


  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className="LoginPage">
        {/* <div> LoginPage </div>
        <Link to="NavPage"><button>login</button></Link> */}
        <div className="login-line">
          <hr className="login-line-left" />
          <span className="login-welcome">Welcome</span>
          <hr className="login-line-right" />
        </div>
        <form>
        <div className="login-inputs">
          <div className="login-left"></div>
          <div className="login-right">
            <div className="login-right-top">
              <div className="ID-container"></div>
              <input className="ID-input" placeholder="YUOR ID" name="username" value={username} onChange={this.handleChange}  />
            </div>
            <div className="login-right-bottom">
              <div className="login-right-bottom-left">
                <div className="password-container"></div>
                <input className="password-input" placeholder="YUOR PASSWORD" name="password" value={password} onChange={this.handleChange}/>
              </div>
              <div className="login-right-bottom-right">
              <div className="go-container" onClick={this.handleSubmit}></div>
              </div>
            </div>
          </div>
        </div>
        </form>
        
      </div>
      
    );
  }
}

const connectedLoginPage = connect()(LoginPage);
export { connectedLoginPage as LoginPage }; 