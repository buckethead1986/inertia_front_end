import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import "./App.css";
import "./date_time.css";
import ChallengeContainer from "./containers/ChallengeContainer";
import InertiaContainer from "./containers/InertiaContainer";
import ChallengeForm from "./components/createChallenge/ChallengeForm";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/createUser/Signup";
import Login from "./components/loginUser/Login";
import Challenges from "./components/challengeIndex/challenges";
import LoginNavbar from "./components/navbar/LoginNavbar";

const url = "http://localhost:3001/api/v1/";

class App extends Component {
  constructor() {
    super();
    this.updateState = this.updateState.bind(this);
  }

  state = {
    currentUser: {}
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ currentUser: {} });
    this.props.history.push("/login");
  };

  challengesLink = () => {
    this.props.history.push("/challenges");
  };

  newChallengeLink = () => {
    this.props.history.push("/challenge/new");
  };

  signup = () => {
    this.props.history.push("/signup");
  };

  backToLogin = () => {
    this.props.history.push("/login");
  };

  updateState = json => {
    this.setState({ currentUser: json });
  };

  fetchUserInformation = () => {
    fetch(`${url}current_user`, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(this.updateState);
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      this.fetchUserInformation();
    } else {
      if (!window.location.href.includes("signup")) {
        this.props.history.push("/login");
      }
    }
  }

  // componentDidMount = () => {
  //   fetch(`${url}challenges`)
  //     .then(res => res.json())
  //     .then(json =>
  //       this.setState({
  //         challenges: json
  //       })
  //     );
  // };

  render() {
    return (
      <div>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/signup" ? (
          <Navbar
            logout={this.logout}
            challengesLink={this.challengesLink}
            newChallengeLink={this.newChallengeLink}
          />
        ) : (
          <LoginNavbar
            location={this.props.location.pathname}
            signup={this.signup}
            backToLogin={this.backToLogin}
          />
        )}
        <div>
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/login"
            render={props => (
              <Login fetchUser={this.fetchUserInformation} {...props} />
            )}
          />
          <Route
            exact
            path="/challenge/new"
            render={() => (
              <div>
                <ChallengeForm users={this.state.users} url={url} />
              </div>
            )}
          />
          <Route
            exact
            path="/challenges"
            render={() => (
              <div>
                <Challenges url={url} currentUser={this.state.currentUser} />
              </div>
            )}
          />
          <Route
            path="/challenges/:id"
            render={() => (
              <div>
                <ChallengeContainer
                  url={url}
                  currentUser={this.state.currentUser}
                />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
