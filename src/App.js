import React, { Component } from "react";
import { withRouter, Route } from "react-router-dom";
import "./App.css";
import "./date_time.css";
import ChallengeContainer from "./containers/ChallengeContainer";
import ChallengeForm from "./components/createChallenge/ChallengeForm";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/createUser/Signup";
import Login from "./components/loginUser/Login";
import Challenges from "./components/challengeIndex/Challenges";
import LoginNavbar from "./components/navbar/LoginNavbar";
import ShowUser from "./components/showUser/ShowUser";
import AllUsers from "./components/showUser/AllUsers";
import Profile from "./components/profile/Profile";

// const url = "http://inertia-app.herokuapp.com/api/v1/";
const url = "http://localhost:3001/api/v1/";

class App extends Component {
  state = {
    currUser: {},
    users: [],
    challenges: [],
    id: 0
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ currUser: {}, id: 0, users: [], challenges: [] });
    this.props.history.push("/login");
  };

  challengesLink = () => {
    this.props.history.push("/challenges");
  };

  usersLink = () => {
    this.props.history.push("/users");
  };

  profileLink = () => {
    this.props.history.push("/user");
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
    this.setState({ currUser: json });
  };

  fetchUserInformation = () => {
    console.log("fetcUserInformation");
    fetch(`${url}users`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json
        })
      )
      .then(() => this.fetchCurrentUser());
  };

  fetchCurrentUser = () => {
    console.log("fetchCurrentUser");
    fetch(`${url}current_user`, {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json =>
        this.setState({
          id: json.id,
          currUser: this.state.users.filter(user => {
            return user.id === json.id;
          })
        })
      )
      .then(() => this.fetchChallenges());
  };

  fetchChallenges = () => {
    fetch(`${url}challenges`)
      .then(res => res.json())
      .then(json =>
        this.setState(
          {
            challenges: json
          },
          () => this.render()
        )
      );
  };

  componentDidMount() {
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
            profileLink={this.profileLink}
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
            render={() => {
              if (this.state.currUser.length !== 0 && this.state.id !== 0) {
                return (
                  <div>
                    <ChallengeForm
                      url={url}
                      currUser={this.state.currUser}
                      fetchChallenges={this.fetchChallenges}
                    />
                  </div>
                );
              } else {
                return "";
              }
            }}
          />
          <Route
            exact
            path="/challenges"
            render={() => {
              if (this.state.currUser.length !== 0 && this.state.id !== 0) {
                return (
                  <div>
                    <Challenges
                      url={url}
                      currUser={this.state.currUser}
                      challenges={this.state.challenges}
                    />
                  </div>
                );
              } else {
                return "";
              }
            }}
          />
          <Route
            exact
            path="/user"
            render={() => {
              if (this.state.id !== 0 && this.state.challenges.length !== 0) {
                return (
                  <div>
                    <Profile
                      url={url}
                      id={this.state.id}
                      currUser={this.state.currUser}
                      users={this.state.users}
                      fetchUser={this.fetchUserInformation}
                      challenges={this.state.challenges}
                    />
                  </div>
                );
              } else {
                return "";
              }
            }}
          />
          <Route
            exact
            path="/users"
            render={() => {
              if (
                this.state.users.length !== 0 &&
                this.state.challenges.length !== 0
              ) {
                return (
                  <div>
                    <AllUsers
                      url={url}
                      currUser={this.state.currUser}
                      showUser={this.showUser}
                      users={this.state.users}
                      challenges={this.state.challenges}
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
            render={props => {
              if (
                this.state.users.length !== 0 &&
                this.state.challenges.length !== 0
              ) {
                return (
                  <div>
                    <ShowUser
                      {...props}
                      url={url}
                      currUser={this.state.currUser}
                      users={this.state.users}
                      challenges={this.state.challenges}
                    />
                  </div>
                );
              } else {
                return "";
              }
            }}
          />
          <Route
            path="/challenges/:id"
            render={props => (
              <div>
                <ChallengeContainer
                  {...props}
                  url={url}
                  currUser={this.state.currUser}
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
