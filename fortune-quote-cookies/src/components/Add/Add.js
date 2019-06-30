import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import seal from './seal.svg';
import './Add.css';
import axios from 'axios';
import env from '../../url';

class Add extends Component {
  
  
  constructor(props){
    super(props);
    this.state = {
      age: '',
      name: 'hai',
      id: 0,
      oldValues: [],
      categories: ['none', 'arts', 'books', 'death', 'education', 'faith', 'friendship', 'funny', 'god',
      'happiness', 'hope', 'humor', 'inspiration', 'knowledge', 'life', 'love', 'mind',
      'motivation', 'philosophy', 'poetry', 'positive', 'purpose', 'quotes',
      'relationship', 'religion', 'romance', 'science', 'soul', 'success', 'truth',
      'wisdom', 'writing'],
      authorName: 'anonymous',
      quoteContext: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      id: event.target.value
    });
  }

  handleAuthorChange = (event) => {
    this.setState({
      authorName: event.target.value
    });
  }

  handleQuoteChange = (event) => {
    this.setState({
      quoteContext: event.target.value
    });
  }

  handleSubmit = () => {
    if(this.state.quoteContext !== ''){
      axios.post(env.quoteAPI, {
        Quote: this.state.quoteContext,
        Author: this.state.authorName,
        Category: this.state.categories[this.state.id]
      })
      .then((res, req) =>{
        console.log("finish post like");
          // console.log("this is response of post postits,", res.data);
          // console.log("this is response of post postits req,", req.data);
      }).catch(err => {
          console.log(err);
      });
      document.getElementsByClassName('suc')[0].style.visibility = 'visible';
      this.setState({
        quoteContext: '',
        id: 0
      });
    }
    else{
      document.getElementsByClassName('wrong')[0].style.visibility = 'visible';
    }
  }

  render() {
    return (
      <div className="Add">
        <div className="add-bg-2">
          <div className="add-page">Add your own quote</div>
          <div className="add-context">
            <div className="add-author">
              <div className="author-text text">Author (the author name want to show): </div>
              <input className="author-input" onChange={this.handleAuthorChange}/>
            </div>
            <div className="add-quote">
              <div className="quote-text text">Quote:</div>
              <textarea className="quote-input" onChange={this.handleQuoteChange}/>
            </div>
            <div className="add-category">
              <div className="category-text text">Category (Choose one category for this quote):</div>
              {/* <input className="category-input" /> */}
              <FormControl variant="outlined" className="category-input">
                <Select
                  value={this.state.id}
                  onChange={this.handleChange}
                  input={<OutlinedInput labelWidth="100px" name="age" id="outlined-age-simple" />}
                >
                  {this.state.categories.map(
                    (e, id) => <MenuItem value={id}> {e} </MenuItem> ) }
                  {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="add-alert suc">Your Quote is successfully added to the dataset!</div>
          <div className="add-alert wrong">Something goes wrong, Please check.</div>
          <img className="seal" src={seal} onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default Add;
