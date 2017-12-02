import React, { Component } from "react";
import ChallengeView from "../components/showChallenge/ChallengeView";

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

  fetchChallenge = () => {
    fetch("http://localhost:3001/api/v1/challenges/10")
      .then(res => res.json())
      .then(json => {
        this.setState({
          challenge: json
        });
      });
  };

  render() {
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
