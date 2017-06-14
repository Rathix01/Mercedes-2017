import React, { Component } from 'react';
import Dashboard from '../system/modules/dashboard';

import ComponentDisplay from '../system/modules/component-display';
// This will import all of the '*.demo.js' files in the module folders.
import '../system/modules/component-display/stores/loader';


class App extends Component {
  render() {
    return (
        <div className="app-container"> <ComponentDisplay id="LandingPage" /> </div>
    );
  }
};

export default App;
