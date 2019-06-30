import React, { Component } from 'react';
import './Collect.css';
import axios from 'axios';
import env from '../../url';

class Collect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: ['', 'arts', 'books', 'death', 'education', 'faith', 'friendship', 'funny', 'god',
      'happiness', 'hope', 'humor', 'inspiration', 'knowledge', 'life', 'love', 'mind',
      'motivation', 'philosophy', 'poetry', 'positive', 'purpose', 'quotes',
      'relationship', 'religion', 'romance', 'science', 'soul', 'success', 'truth',
      'wisdom', 'writing'],
      showing_category: "all",
      my_collections: [],
      showing_collections: [],
      user_id: "test",
      user_password: "test"
    }
  }

  handleCategory = (event) => {
    document.getElementById(this.state.showing_category).style.borderLeft = "";
    document.getElementById(this.state.showing_category).style.background = "";
    document.getElementById(this.state.showing_category).style.color = "rgb(88, 78, 72)";
    console.log("handle category:", event.target.innerHTML);
    const showing_category = event.target.innerHTML;
    this.setState({showing_category: showing_category});
    let cat = "";
    if(showing_category === "All <span class=\"my-collection-text\">of my collections</span>" || showing_category === "of my collections"){
      this.setState({showing_collections: this.state.my_collections});
      this.setState({showing_category: "all"});
      cat = "all"
    }
    else{
      this.setState({showing_collections: this.state.my_collections.filter(item => 
        item.category == showing_category
      )});
      cat = showing_category;
    }
    document.getElementById(cat).style.background = "rgb(195, 181, 165)";
    document.getElementById(cat).style.borderLeft = "rgb(129, 116, 106) solid 2px";
  }

  componentDidMount = () => {
    axios.get(env.profileAPI, {
      params: { user_id: this.state.user_id, user_password: this.state.user_password }
    }).then((res) => {
        console.log("respond quotes:", res.data.collected);
        this.setState({
          my_collections: res.data.collected,
          showing_collections: res.data.collected
        });
      }).catch(err => {
          console.log(err);
      });
      document.getElementById("all").style.background = "rgb(195, 181, 165)";
      document.getElementById("all").style.borderLeft = "rgb(129, 116, 106) solid 2px";
  }

  render() {
    console.log("showing_collections:", this.state.showing_collections);
    return (
      <div className="Collect">
        <div className="collect-bg">
          <div className="collect-bg-2">
            <div className="category-list-container">
              <div className="category-item" onClick={this.handleCategory} id="all">All <span className="my-collection-text">of my collections</span></div>
              {this.state.categories.map(
              e => <div className="category-item" id={e} onClick={this.handleCategory}>{e}</div> ) }
            </div>
          </div>
          <div className="collect-bg-3">
            <ul className="quote-list-container">
            {this.state.showing_collections.map(
              e => <li className="quote-item">
                      <div className="quote-context">{e.quote}</div>
                      <div className="quote-author">--{e.author}</div>
                      <hr />
                    </li> ) }

              {/* <li className="quote-item">
                <div className="quote-context">Be who you are and say what you feel, 
                    because those who mind don't matter, and those who matter don't mind.</div>
                <div className="quote-author">-- Bernard M. Baruch</div>
                <hr />
              </li> */}
            </ul>
          </div>
        </div>
      </div>

    );
  }
}

export default Collect;
