import React, { Component } from "react";
import ChallengeView from "../components/showChallenge/ChallengeView";
const url = "http://localhost:3001/api/v1/";

class ChallengeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {}
    };
  }

  componentDidMount() {
    this.fetchChallenge();
  }

  componentDidUpdate() {
    this.userBelongsToChallenge();
  }

  userBelongsToChallenge = () => {
    if (this.state.challenge.name) {
      const users = this.state.challenge.user_challenges.map(uc => {
        return uc.user;
      });
      if (users.includes(this.props.currentUser)) {
        console.log("Success");
      }
    }
  };

  fetchChallenge = () => {
    const id = window.location.href.split("/");
    const specific_id = id[id.length - 1];
    fetch(`${url}challenges/${specific_id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          challenge: json
        });
      });
  };

  render() {
    console.log(this.state.challenge);
    return (
      <div>
        {this.state.challenge.name ? (
          <ChallengeView challenge={this.state.challenge} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ChallengeContainer;
