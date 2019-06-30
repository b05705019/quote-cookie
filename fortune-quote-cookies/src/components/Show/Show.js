import React, { Component } from 'react';
import './Show.css';
import axios from 'axios';
import env from '../../url';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import like from './like.svg';
import dislike from './dislike.svg';
import { Link } from 'react-router-dom';


class Particle {
  constructor(x, y, ww, wh){
    this.ran = [Math.random(),Math.random()]
    this.x = x + (this.ran[0] - 0.5) * 10;
    this.y = y + (this.ran[1] - 0.5) * 10;
    this.dest = {
        x: x + (this.ran[0] - 0.5)*2,
        y: y + (this.ran[1] - 0.5)*2
    };
    this.r = this.ran[0]*0.5+1;
    this.vx = 0;
    this.vy = 0;
    this.accX = 0;
    this.accY = 0;
    this.friction = this.ran[0] * 0.05 + 0.8;

    
    this.cR = this.ran[0] > 0.99 ? 30: 2;
    this.cAng = this.ran[1]*360;
    this.cW = 0.03;
    this.wait = this.cR > 10 ? this.ran[1]*20: this.ran[1]*20+30;

    this.color = {r:0, g:0, b:0};
    this.opecity = 0;

    this.disapear = false;
    this.dead = 20;
    this.done = false;
  }
}

class Show extends Component {
  constructor(props){
    super(props);
    this.state = {
      ww: window.innerWidth,
      wh: window.innerHeight
    };
    this.particles = [];
    this.amount = 0;
    this.doneAmount = 0;
    this.pltGap = 3;
    this.radius = 200;
    this.mouse = {
      x: 0,
      y: 0
    }
    this.over = false;

  }
  init = (quote) => {
    if(!quote){
      quote = JSON.parse(localStorage.getItem("quote")).Quote||"";
    }
    this.ctx = this.canvas.getContext("2d");

    this.ctx.clearRect(0, 0, this.state.ww, this.state.wh);

    
    console.log("init quote: ", quote);
    this.doneAmount = 0;
    let shows = quote.split(/(?=[,.]\s)/g);
    let display = [""]
    for(let s of shows){
      while(s.length > 25){
        let white = 25;
        while(s[white] !== ' ')
          white--;
        display.push(s.slice(0,white));
        s = s.slice(white, s.length);
      }
      if(s.length < 10)
        display[display.length-1]+=s;
      else
        display.push(s);
    }
    //const shows = ['SUP', 'ERC', 'ELL']
    const fontsize = (this.state.ww / 15);
    this.ctx.font = "bold " + (fontsize) + "px sans-serif";
    this.ctx.textAlign = "center";
    display.map((s, i) => {
      this.ctx.fillText(s, this.state.ww / 2, this.state.wh/2 - ((display.length/2)-i-0.5)*fontsize);
    })



    const data = this.ctx.getImageData(0, 0, this.state.ww, this.state.wh).data;
    this.ctx.clearRect(0, 0, this.state.ww, this.state.wh);
    this.ctx.globalCompositeOperation = "screen";

    this.particles = [];
    for (var i = 0; i < this.state.ww; i += this.pltGap) {
        for (var j = 0; j < this.state.wh; j += this.pltGap) {
            if (data[((i + j * this.state.ww) * 4) + 3] > 150) {
                this.particles.push(new Particle(i, j, this.state.ww, this.state.wh));
            }
        }
    }
    this.amount = this.particles.length;
    
  }
  renderCanvas = ()=>{
    if(!this.over) requestAnimationFrame(this.renderCanvas);
    this.ctx.clearRect(0, 0, this.state.ww, this.state.wh);
    for (var i = 0; i < this.amount; i++) {
        this.renderParticle(this.particles[i], i);
    }
    this.ctx.fillStyle = "#FDF5E6";
    this.ctx.beginPath();
    this.ctx.arc(this.mouse.x, this.mouse.y, this.radius, Math.PI * 2, false);
    this.ctx.fill();
  }
  renderParticle = (p, i)=>{
    
    if(p.wait > 1){
      p.wait -= 1;
      return;
    }

    p.x += p.vx;
    p.y += p.vy;
    const style = `rgb(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opecity})`;
    this.ctx.fillStyle = style;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
    this.ctx.fill();

    

    if(p.disapear){
      p.dead -= 1;
      p.opecity -= 0.02;
      if (p.dead < 0){
        delete this.particles[i];
        this.particles.splice(i, 1);
        this.amount -= 1;
      }
      return
    }


    p.cAng += p.cW;
    p.vx = Math.sin(p.cAng)*p.cR*p.cW;
    p.vy = Math.cos(p.cAng)*p.cR*p.cW;
    if (p.opecity < 1) p.opecity += 0.1;
    else if (p.done !== true ) {p.done = true; this.doneAmount+=1}
    p.vx += (p.dest.x - p.x) / 30;
    p.vy += (p.dest.y - p.y) / 30;
    p.vx *= p.friction;
    p.vy *= p.friction;

    const a = p.x - this.mouse.x;
    const b = p.y - this.mouse.y;

    const distance = Math.sqrt(a * a + b * b);
    if (distance < this.radius && this.doneAmount >= this.amount) {
      if(p.ran[1] < 0.7) p.dead = 0;
    	const weight = p.ran[1] * 10;//Math.pow(Math.abs(this.radius - distance)/this.radius, 1);
      p.vx = a/distance * weight + (p.ran[0]-0.5)* weight;
      p.vy = b/distance * weight + (p.ran[1]-0.5)* weight;
      p.disapear = true;
    }
    

  }
  onMouseMove = (e)=>{
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
  componentDidUpdate() {
    const {quote} = this.props;
    if (quote != "") this.init(quote);
  }
  componentDidMount() {
    // console.log("cookie", cookie.load("showQuote"));
    this.canvas = this.refs.scene;
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("click", ()=>this.init(this.props.quote));
    
    // this.init();
    requestAnimationFrame(this.renderCanvas);
    
  }
  componentWillUnmount() {
    this.over = true;
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("click", ()=>this.init(this.props.quote));

  }
  
  updateWindowDimensions = ()=>{
    const {quote} = this.props;
    this.setState({ ww: window.innerWidth, wh: window.innerHeight });
    this.init(quote);
  }

  handleLike = () => {
    console.log("user", JSON.parse(localStorage.getItem('user')).result.username);
    axios.post(env.collectAPI, {
        user_id: JSON.parse(localStorage.getItem('user')).result.username,
        quote: JSON.parse(localStorage.getItem('quote')).Quote,
        author: JSON.parse(localStorage.getItem('quote')).Author,
        category: JSON.parse(localStorage.getItem('quote')).Category
      })
      .then((res, req) =>{
        console.log("finish post like");
          // console.log("this is response of post postits,", res.data);
          // console.log("this is response of post postits req,", req.data);
      }).catch(err => {
          console.log(err);
      });
  }

  render() {
    return (
      <div>
        <canvas id="scene" ref="scene" width={this.state.ww} height={this.state.wh} ></canvas>
        <div className="check-button">
          <Link to="/QuoteSearch"><button className="no"><img src={dislike} /></button></Link>
          <Link to="/PersonalPage" onClick={this.handleLike}><button className="yes"><img src={like} /></button></Link>
        </div>
      </div>
    );
  }
    
}


const mapStateToProps = (state) => {
  // setInterval(()=>{console.log("quote mapToState", state);}, 1000);
  console.log("state", state);
  return {
    quote: state.quote.quote_context
  }
}
const connectedShow = connect(mapStateToProps)(Show);
export { connectedShow as Show };
// export default Show;
