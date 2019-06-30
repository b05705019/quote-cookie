import React, { Component } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import '../App.css';
import LiveWall from '../components/LiveWall/LiveWall';
import { LoginPage } from '../components/LoginPage/LoginPage';
import NavPage from '../components/NavPage/NavPage';
import QuoteSearch from '../components/QuoteSearch/QuoteSearch';
import { PersonalPage } from '../components/PersonalPage/PersonalPage';
import cookie from 'react-cookies';
import { PrivateRoute } from '../_components';

import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
// import { PrivateRoute } from '../_components';
// import { HomePage } from '../HomePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: cookie.load("userName"),
      passWord: cookie.load("passWord"),
      inputID: cookie.load('userName'),
      inputPassWord: cookie.load('passWord'),
      checkId: false
    }

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  

  // saveUserName = (props) => {
  //   console.log(this.state.inputID);
  //   console.log(this.state.inputPassWord);
  //   if(res === true){
  //     cookie.save("userName", this.state.inputID, {path:"/"});
  //     cookie.save("passWord", this.state.inputPassWord, {path:"/"});
  //     this.
  //     this.setState({checkId: true});
  //     console.log(cookie.loadAll());
  //   }
  //   else{
  //     alert("ID or password is wrong.");
  //   }
  // }

  render() {
    const { alert } = this.props;
    console.log("app");
    return (
      <Router history={history}>
        <div className="App">
          <div>
            <Switch>
              
              <Route exact path="/" component={LiveWall} />
              <Route path="/LoginPage" render={() => <LoginPage userName={this.state.userName} 
                    passWord={this.state.passWord} saveUserName={this.saveUserName} />} />

              <PrivateRoute path="/NavPage" component={NavPage} />
              
              {/* <Route path="/NavPage" render={(props) => 
              (cookie.load("userName") === "" || cookie.load("passWord") === "" || this.state.checkId === false) ?
                (<Redirect to="/LoginPage" />):
                (<NavPage />)
              } /> */}
              
              <PrivateRoute path="/QuoteSearch" component={QuoteSearch} />
              <PrivateRoute path="/PersonalPage" component={PersonalPage} />
              <Redirect from="/" to="/" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 