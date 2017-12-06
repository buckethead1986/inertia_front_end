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
import Challenges from "./components/challengeIndex/Challenges";
import LoginNavbar from "./components/navbar/LoginNavbar";
import ShowUser from "./components/showUser/ShowUser";
import AllUsers from "./components/showUser/AllUsers";

const url = "http://localhost:3001/api/v1/";

class App extends Component {
  constructor() {
    super();
    this.updateState = this.updateState.bind(this);
  }

  state = {
    currentUser: {},
    users: []
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ currentUser: {} });
    this.props.history.push("/login");
  };

  challengesLink = () => {
    this.props.history.push("/challenges");
  };

  usersLink = () => {
    this.props.history.push("/users");
  };

  showUser = id => {
    this.props.history.push(`/users/${id}`);
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

    fetch(`${url}users`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json
        })
      );
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.fetchUserInformation();
    } else {
      if (!window.location.href.includes("signup")) {
        this.props.history.push("/login");
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/signup" ? (
          <Navbar
            logout={this.logout}
            challengesLink={this.challengesLink}
            newChallengeLink={this.newChallengeLink}
            usersLink={this.usersLink}
          />
        ) : (
          <LoginNavbar
            location={this.props.location.pathname}
            signup={this.signup}
            backToLogin={this.backToLogin}
          />
        )}
        <div>
          <Route
            exact
            path="/login"
            render={props => (
              <Login fetchUser={this.fetchUserInformation} {...props} />
            )}
          />
          <Route
            exact
            path="/signup"
            render={props => (
              <Signup fetchUser={this.fetchUserInformation} {...props} />
            )}
          />
          <Route
            exact
            path="/challenge/new"
            render={() => (
              <div>
                <ChallengeForm url={url} currentUser={this.state.currentUser} />
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
            exact
            path="/users"
            render={() => {
              if (this.state.users.length !== 0) {
                return (
                  <div>
                    <AllUsers
                      url={url}
                      currentUser={this.state.currentUser}
                      showUser={this.showUser}
                      users={this.state.users}
                    />
                  </div>
                );
              } else {
                return "";
              }
            }}
          />
          <Route
            path="/users/:id"
            render={props => (
              <div>
                <ShowUser
                  {...props}
                  url={url}
                  currentUser={this.state.currentUser}
                />
              </div>
            )}
          />
          <Route
            path="/challenges/:id"
            render={props => (
              <div>
                <ChallengeContainer
                  {...props}
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
