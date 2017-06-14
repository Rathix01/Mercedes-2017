import React, { Component } from 'react';
import GmMain from '../system/modules/warhammer-gm-main';

class App extends Component {
  render() {
    return (
        <div className="app-container"> 
        	<GmMain id="GmMain" /> 
        </div>
    );
  }
};

export default App;


