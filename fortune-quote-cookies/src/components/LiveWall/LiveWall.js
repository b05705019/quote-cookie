import React, { Component } from 'react';
import './LiveWall.css';
import { Link } from 'react-router-dom';
import Box from '../Box/Box';
import lily from './lily2.svg';
import axios from 'axios';
import lavender from './lavender.svg';
import flower from './noun_flowers.svg';
import env from '../../url';

class LiveWall extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      // colors: ['#C1395E', '#AEC17B', '#F0CA50', '#E07B42', '#89A7C2'],
      colors: ['#C8DAAD', '#989E53', '#738D60', '#DEBC31', '#9D471A'],
      container_items: ['box-container1'],
      newBox: [],
      keywords: []
    }
    
  }
  componentDidMount = () => {

    axios.get(env.keyAPI, {})
      .then((res) => {
        let key = [];
        for(var i = 0; i < res.data.length; i++){
          key.push(res.data[i].key);
        }
        this.setState({keywords: key});
      }).catch(err => {
          console.log(err);
      });
  };

  componentWillUnmount() {
  }

  // get data from the recent search key word and show on the livewall

  

  render() {
    const boxes = new Array(25);
    boxes.fill("");

    const { data, loading } = this.state;
    return (
        <div className="liveWall">
          {boxes.map(x => <Box colors={this.state.colors} keywords={this.state.keywords} /> )}
          <Link to="/NavPage">
            <div className="liveWall-start">
              <div className="liveWall-flower"><img src={flower} /></div>
              <div className="liveWall-text">start</div>
              <div className="liveWall-lily"><img src={lily} /></div>
            </div>
          </Link>
        </div>
    );
  }
}

export default LiveWall;
