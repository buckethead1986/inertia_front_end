import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { formatResults } from "../services/formatResults.js";

import ChallengeView from "../components/showChallenge/ChallengeView";

class ChallengeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalChallenge: {},
      challenge: {},
      voted: null,
      teamVotedFor: null,
      completed: false
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
        this.setState({
          originalChallenge: json
        });
      });
  };

  handleVote = teamVotedFor => {
    // Make a post request to the user challenge object
    const userChallenge = this.state.originalChallenge.user_challenges.find(
      uc => {
        return uc.user.id === this.props.currentUser.id;
      }
    );

    fetch(
      `http://inertia-app.herokuapp.com/api/v1/user_challenges/${
        userChallenge.id
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify({ vote: teamVotedFor })
      }
    ).then(res => {
      this.fetchChallenge();
    });
  };

  deadlineOver = () => {
    this.setState({
      completed: true
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
            handleVote={this.handleVote}
            deadlineOver={this.deadlineOver}
            completed={this.state.completed}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(ChallengeContainer);
