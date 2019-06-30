import React, { Component } from 'react';
import './NavPage.css';
import { Link } from 'react-router-dom';


class NavPage extends Component {
  render() {
    return (
      <div className="NavPage">
        <div className="nav-container">
          <div className="diamond-container"><div className="nav-diamond-left"></div></div>
          <div className="nav-bar">
            <Link to="/QuoteSearch" className="nav-text"><div className="vertical-line nav-text2"> QuoteSearch </div></Link> 
            <Link to="/PersonalPage" className="nav-text"><div> PersonalPage </div></Link> 
          </div>
          <div className="diamond-container diamond-container-right">
            <hr className="nav-line" />
            <div className="nav-diamond-right"></div>
          </div>
        </div>
        <span className="nav-cross1">&#10011;</span>
        <span className="nav-cross2">&#10011;</span>
        <div className="cross-symbol1">
          <div className="line-hori"></div>
          <div className="line-vert"></div>
        </div>
        <div className="cross-symbol2">
          <div className="line-hori"></div>
          <div className="line-vert"></div>
        </div>
        <div className="cross-symbol3">
          <div className="line-hori"></div>
          <div className="line-vert"></div>
        </div>
      </div>
    );
  }
}

export default NavPage;
