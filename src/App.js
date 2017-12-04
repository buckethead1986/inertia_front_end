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
const url = "http://localhost:3001/api/v1/";

const Inertia = () => <ChallengeContainer />;
class App extends Component {
  state = {
    users: [],
    currentUser: {}
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ currentUser: {} });
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${url}current_user`, {
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(json => this.setState({ currentUser: json }));
    } else {
      if (!window.location.href.includes("signup")) {
        this.props.history.push("/login");
      }
    }
  }

  componentDidMount() {
    fetch(`${url}users`)
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
              render={() => (
                <InertiaContainer users={this.state.users} url={url} />
              )}
            />
            <Route exact path="/login" component={Login} />
            <Route
              path="/challenges/:id"
              render={() => (
                <ChallengeContainer
                  currentUser={this.state.currentUser}
                  url={url}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
