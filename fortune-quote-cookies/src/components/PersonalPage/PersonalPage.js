import React, { Component } from 'react';
import './PersonalPage.css';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import Collect from '../Collect/Collect';
import Add from '../Add/Add';
import Success from '../Success/Success';
import anonymous from './noun_anonymous avatar_2631891.svg';
import cross_icon from './noun_Cross_468199.svg';
import logout from './leave.svg';
import { userActions } from '../../_actions';
import { connect } from 'react-redux';
import { history } from '../../_helpers';

class PersonalPage extends Component {
  constructor(props){
    super(props);
    this.state = {
    }

  }
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }
  render() {
    return (
      <div className="PersonalPage">
        {/* <div> PersonalPage </div>
        <Link to="/PersonalPage/Collect"><button> Collect </button></Link>
        <Link to="/PersonalPage/Add"><button> Add </button></Link> */}
        <div className="personal-bg-1">
          <img className="personal-profile" src={anonymous} alt="profile" />
          <div className="personal-nav">
            <Link to="/navPage">
              <div className="personal-menu">
                <div className="personal-hori-line"></div>
              </div>
            </Link>
            <div className="personal-vert-line"></div>
            <Link to="/liveWall"><div className="personal-square"></div></Link>
            <div className="personal-vert-line"></div>
            <Link to={history.location.pathname === "/PersonalPage/Collect"?"/PersonalPage/Add":"/PersonalPage/Collect"}><img className="personal-cross" src={cross_icon} alt="cross" /></Link>
          </div>
          <Link to="/LiveWall" onClick={this.handleLogout}><img className="logout" alt="logout" src={logout}/></Link>
        </div>

        <Switch>
          <Route path="/PersonalPage/Collect" exact component={Collect} />
          <Route path="/PersonalPage/Add" exact component={Add} />
          {/* <Route path="/PersonalPage/Success" exact component={Success} /> */}
          <Redirect from="/" to="/PersonalPage/Collect" />
        </Switch>
      </div>
    );
  }
}

const connectedPersonalPage = connect()(PersonalPage);
export { connectedPersonalPage as PersonalPage }; 
// export default PersonalPage;
