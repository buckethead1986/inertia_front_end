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
    const id = window.location.href.split("/");
    const specific_id = id[id.length - 1];
    console.log(specific_id);
    fetch(`https://inertia-app.herokuapp.com/api/v1/challenges/${specific_id}`)
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
