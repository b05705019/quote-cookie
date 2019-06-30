import React, { Component } from 'react';
import './Success.css';

class Success extends Component {
  
  
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="Success">
        <div className="success-text">
          Successfully create your own quote!<br/>
          Someone may get your quote from now on.
          Go back to <span> search page </span> for finding more.
        </div>
      </div>
    );
  }
}

export default Success;
