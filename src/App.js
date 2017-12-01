import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import ChallengeContainer from "./containers/ChallengeContainer";
import InertiaContainer from "./containers/InertiaContainer";

const Inertia = () => <ChallengeContainer />;

class App extends Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    fetch("http://localhost:3001/api/v1/users")
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json
        })
      );
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route
              exact
              path="/challenge/new"
              render={() => <InertiaContainer users={this.state.users} />}
            />
            <Route exact path="/inertia" component={ChallengeContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
