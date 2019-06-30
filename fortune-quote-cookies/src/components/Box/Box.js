import React, { Component } from 'react';
import './Box.css';
import Type from '../Type/Type';
import axios from 'axios';

class Box extends Component {
  constructor(props) {
    super(props);
    //const texts = ['HELLO', 'HOLA', 'STAY', 'STUPID', 'SLEEPY', 'GOOD MORNING', 'GOOD NIGHT'];
    // const rand_text_num = Math.floor(Math.random() * this.state.keywords.length);
    const rand_color_num = Math.floor(Math.random() * 5);
    this.r_c = this.props.colors[rand_color_num];
    // this.r_t = this.state.keywords[rand_text_num];   
    // console.log("r_t", this.r_t);
    this.state = {
      newBoxNode: null,
      oldBoxNode: <div className="box"  style={{
        top: 0,
        left: 0,
        background: this.r_c
      }}></div>,
      oldBackground: this.r_c,
      rand_text_old: ""
    }
  }
  
  action = ()=>{
    
    // random color
    let rand_color;
    do{
      rand_color = this.props.colors[Math.floor(Math.random()*this.props.colors.length)];
    }while(rand_color === this.state.oldBackground);
    
    // random position
    const rand_pos = Math.floor(Math.random() * 4);
    const styleValue = [["-100%", "100%", "", ""], ["100%", "-100%", "", ""], 
    ["", "", "-100%", "100%"], ["", "", "100%", "-100%"]][rand_pos];
    
    // random a text
    let rand_text_new;
    do{
      rand_text_new = this.props.keywords[Math.floor(Math.random()*this.props.keywords.length)];
    }while(rand_text_new===this.state.rand_text_old && !rand_text_new);

    //new a box
    this.setState({
      newBoxNode: <div className="box"  style={{
        top: styleValue[0],
        left: styleValue[2],
        background: rand_color
      }}><Type text={rand_text_new||""} /></div>
    });

    //trigger transition
    //console.log("trigger old");
    this.setState(prevState => ({
      oldBoxNode: <div className="box"  style={{
        top: styleValue[1],
        left: styleValue[3],
        background: prevState.oldBackground
      }}><Type text={prevState.rand_text_old}  /></div>
    }));

    //console.log("trigger new");
    const newBoxIn = () => {this.setState({
      newBoxNode: <div className="box"  style={{
        top: 0,
        left: 0,
        background: rand_color
      }}><Type text={rand_text_new} /></div>,
      rand_text_old: rand_text_new
    })};
    setTimeout(newBoxIn, 10);
    
    //after 1 s
    //console.log("after 1s")
    setTimeout(()=>{
      //console.log()
      this.setState(prevState=>({
      oldBoxNode:  <div className="box"  style={{
        top: 0,
        left: 0,
        background: rand_color,
        transition: "initial"
      }}>{prevState.newBoxNode.props.children}</div>,
      newBoxNode: null,
      oldBackground: rand_color
      }));
      }, 3000);
    this.timeoutId = setTimeout(this.action, Math.random()*4000 + 5000);
  }
  componentWillMount = () => {
    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.keywords.length !== 0 && this.props.keywords.length === 0){
      this.timeoutId = setTimeout(this.action, 10);
    }
  }

  componentDidMount = () => {
  }
  componentWillUnmount = () => {
    clearTimeout(this.timeoutId);
  }
  render() {
    return (
      <div className="box-container">
        {this.state.oldBoxNode}{this.state.newBoxNode}
      </div>

    );
  }
}

export default Box;