import React, { Component } from "react";
import ChallengeForm from "../components/createChallenge/ChallengeForm";
import Navbar from "../components/navbar/Navbar";
// import Challenge from "../components/createChallenge/challenge";

class InertiaContainer extends Component {
  render() {
    return (
      <div>
        <Navbar
          logout={this.props.logout}
          challengesLink={this.props.challengesLink}
          newChallengeLink={this.props.newChallengeLink}
        />
        <ChallengeForm users={this.props.users} url={this.props.url} />
      </div>
    );
  }
}

export default InertiaContainer;

//Not useful anymore, bypassed.
