import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

import InertiaContainer from "./containers/InertiaContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <InertiaContainer />
      </div>
    );
  }
}

export default App;
