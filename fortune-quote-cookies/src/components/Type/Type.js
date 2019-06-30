import React, { Component } from 'react';
import './Type.css';

class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      writeIndex: 0
    }
    
  }
  componentWillReceiveProps(nextProps){
    if(this.props.text !== nextProps.text){
      this.setState({text: nextProps.text});
    }
  }

  cursor = () => {
    const length = this.state.text.length;
    let newText="";
    if(this.state.text[length-1] === "|")
      newText = this.state.text.slice(0,length-1);
    else
      newText = this.state.text + "|";
    this.setState({text: newText});
  }

  write = () => {
    let newIndex = this.state.writeIndex+1;
    this.setState({writeIndex: newIndex});
    const length = this.state.text.length;
    const lst = (this.state.text[length-1] === "|")? "|" : "";
    const newText = this.props.text.slice(0, newIndex) + lst;
    this.setState({text: newText}); 
    if(newIndex < this.props.text.length) {
      this.timeout = setTimeout(this.write, Math.random()*200+200);
    }
  }
  componentDidMount(){
    this.intervalId = setInterval(this.cursor, 600);
    setTimeout(this.write, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
    clearTimeout(this.timeout); 
  }
  render() {
    return (
      <div className="type">{this.state.text}</div>
    );
  }
}

export default Type;
