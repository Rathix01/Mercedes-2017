import React, { Component } from 'react';
import DynamicForm from '../system/modules/dynamic-form';

class App extends Component {
  render() {
    return (
        <div className="app-container">
        	<DynamicForm id="Main" />
        </div>
    );
  }
};

export default App;


