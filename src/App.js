import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "./date_time.css";
import ChallengeContainer from "./containers/ChallengeContainer";
import InertiaContainer from "./containers/InertiaContainer";
import Challenges from "./components/challengeIndex/challenges";
import ChallengeTest from "./components/createChallenge/challenge_test";
import Signup from "./components/createUser/signup";
import Login from "./components/loginUser/login";

//take these out
import Direct from "./components/createChallenge/direct";
import Redirect from "./components/createChallenge/redirect";

const Inertia = () => <ChallengeContainer />;
class App extends Component {
  state = {
    users: []
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      fetch("https://inertia-app.herokuapp.com/api/v1/current_user", {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: token
        }
      }).then(res => console.log(res));
    } else {
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    fetch("https://inertia-app.herokuapp.com/api/v1/users")
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json
        })
      );
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/direct" component={Direct} />
            <Route exact path="/redirect" component={Redirect} />
            <Route exact path="/signup" component={Signup} />
            <Route
              exact
              path="/challenge/new"
              render={() => <InertiaContainer users={this.state.users} />}
            />
            <Route exact path="/login" component={Login} />
            <Route path="/challenges/:id" component={ChallengeContainer} />
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
