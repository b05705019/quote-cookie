import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import axios from 'axios';
import env from '../../url';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { userActions } from '../../_actions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordInput: "hello"
    }
    
  }
  handleSearch = () => {
    document.getElementsByClassName('list-container')[0].style.animationName = 'none';
    document.getElementsByClassName('list-container')[0].style.visibility = 'hidden';
    document.getElementsByClassName('search-input')[0].focus();
    document.getElementsByClassName('search-input')[0].style.borderBottom = 'pink solid 1px';
  }
  
  passKeyWordToDB = () => {
    const {getQuote} = this.props;
    getQuote(JSON.stringify({}));
    axios.get(env.quoteAPI, {
      params: { input: this.props.keywordInput }
    }).then((res) => {
        console.log("respond quote:", JSON.stringify(res.data));
        // cookie.save("showQuote", res.data.Quote);
        getQuote(JSON.stringify(res.data));

      }).catch(err => {
          console.log(err);
      });
  }


  render() {
    return (
      <div className="Search">
        <div className="search-content">
          <div className="search-content-container" onClick={this.handleSearch}>
            <p className="search-text"> Search for </p>
            <input className="search-input" ref="searchInput"/>
            <ul className="list-container">
              <li className="list-item">world !</li>
              <li className="list-item">bob !</li>
              <li className="list-item">users !</li>
              <li className="list-item">everybody !</li>
            </ul>
          </div>
        </div>
        <Link to="/QuoteSearch/Show" onClick={this.passKeyWordToDB}><div className="search-button"></div></Link>
        
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {

  return { 
    getQuote: (quote) => {
      dispatch(userActions.getQuote(quote))
      // dispatch({type: 'GET_QUOTE', quote})
    }
  }
}

const connectedSearch = connect(null, mapDispatchToProps)(Search);
export { connectedSearch as Search }; 
// export default Search;
