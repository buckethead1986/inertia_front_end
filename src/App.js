import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Challenge from "./components/createChallenge/challenge";
import ChallengeContainer from "./containers/ChallengeContainer";
const NewChallenge = () => <Challenge />;
const Inertia = () => <ChallengeContainer />;

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/challenge/new" component={NewChallenge} />
            <Route exact path="/inertia" component={ChallengeContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
