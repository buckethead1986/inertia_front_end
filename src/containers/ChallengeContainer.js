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

  fetchChallenge = () => {
    const id = window.location.href.split("/");
    const specific_id = id[id.length - 1];
    console.log(specific_id);
    fetch(`${url}challenges/${specific_id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          challenge: json
        });
      });
  };

  render() {
    console.log(this.props);
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
