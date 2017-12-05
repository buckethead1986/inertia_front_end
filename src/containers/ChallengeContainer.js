import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { formatResults } from "../services/formatResults.js";

import ChallengeView from "../components/showChallenge/ChallengeView";

class ChallengeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {},
      voted: null,
      teamVotedFor: null
    };
  }

  componentDidMount() {
    this.fetchChallenge();
  }

  formatChallengeResults = challenge => {
    const results = formatResults(challenge, this.props.currentUser);
    let stateObj;
    if (results.voter) {
      stateObj = {
        challenge: results,
        voted: results.voter.voted,
        teamVotedFor: results.voter.team
      };
    } else {
      stateObj = {
        challenge: results
      };
    }
    this.setState(stateObj);
  };

  fetchChallenge = () => {
    const id = window.location.href.split("/");
    const specific_id = id[id.length - 1];
    fetch(`${this.props.url}challenges/${specific_id}`)
      .then(res => res.json())
      .then(json => {
        this.formatChallengeResults(json);
      });
  };

  handleVote = teamVotedFor => {
    // Make a post request to the user challenge object
    const userChallenge = this.props.challenge.user_challenges.find(uc => {
      return uc.user.id === this.props.currentUser.id;
    });

    fetch(`http://localhost:3001/api/v1/user_challenges/${userChallenge.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({ vote: teamVotedFor })
    }).then(res => {
      this.props.fetchChallenge();
      // this.setState({
      //   voted: true,
      //   challenge: {
      //     ...this.state.challenge,
      //     voter: { voted: true, team: teamVotedFor }
      //   }
      // });
    });
  };

  render() {
    return (
      <div>
        {this.state.challenge.spectators ? (
          <ChallengeView
            challenge={this.state.challenge}
            currentUser={this.props.currentUser}
            fetchChallenge={this.fetchChallenge}
            handleVote={this.props.handleVote}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(ChallengeContainer);
