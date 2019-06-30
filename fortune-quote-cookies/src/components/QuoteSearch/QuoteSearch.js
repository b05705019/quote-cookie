import React, { Component } from 'react';
import './QuoteSearch.css';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import { Search } from '../Search/Search';
import { Show } from '../Show/Show';
import Keep from '../Keep/Keep';

class QuoteSearch extends Component {
  // handleQuoteFunction = () => {
  //   document.getElementsByClassName('quotesearch-cross')[0].style.visibility = 'visible';
  //   document.getElementsByClassName('quotesearch-line')[0].style.visibility = 'hidden';
  // }
  render() {
    return (
      <div className="QuoteSearch">
        {/* <div> QuoteSearch </div> */}
        {/* <Link to="/QuoteSearch/Search"><button> Search </button></Link>
        <Link to="/QuoteSearch/Show"><button> Show </button></Link>
        <Link to="/QuoteSearch/Keep"><button> Keep </button></Link> */}
        <div className="quote-function">
          <Link to="/navPage"><div className="quotesearch-line">
            <div className="quotesearch-line-top"></div>
            {/* <div className="quotesearch-line-bottom"></div> */}
          </div></Link>
          <div className="quotesearch-cross">
            <div className="quotesearch-cross-top"></div>
            <div className="quotesearch-cross-bottom"></div>
          </div>
          <div className="quotesearch-vert"></div>
          <Link to="/liveWall"><div className="quotesearch-livewall"></div></Link>
        </div>
        
        <Switch>
          <Route path="/QuoteSearch/Search" exact component={Search} />
          <Route path="/QuoteSearch/Show" exact component={Show} />
          <Route path="/QuoteSearch/Keep" exact component={Keep} />
          <Redirect from="/" to="/QuoteSearch/Search" />
        </Switch>
      </div>
    );
  }
}

export default QuoteSearch;
