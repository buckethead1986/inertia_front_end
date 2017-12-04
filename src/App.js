import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "./date_time.css";
import ChallengeContainer from "./containers/ChallengeContainer";
import InertiaContainer from "./containers/InertiaContainer";
import Challenges from "./components/challengeIndex/challenges";
import ChallengeTest from "./components/createChallenge/challenge_test";

//take these out
import Direct from "./components/createChallenge/direct";
import Redirect from "./components/createChallenge/redirect";

const Inertia = () => <ChallengeContainer />;
class App extends Component {
  state = {
    users: []
  };

  componentDidMount = () => {
    fetch("https://inertia-app.herokuapp.com/api/v1/users")
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
            <Route exact path="/direct" component={Direct} />
            <Route exact path="/redirect" component={Redirect} />
            <Route exact path="/challenges" component={Challenges} />
            <Route
              exact
              path="/challenge/new"
              render={() => <InertiaContainer users={this.state.users} />}
            />
            <Route
              exact
              path="/challenge/new2"
              render={() => <ChallengeTest users={this.state.users} />}
            />
            <Route exact path="/inertia" component={ChallengeContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
