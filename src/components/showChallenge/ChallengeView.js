import React, { Component } from "react";
import ResultsContainer from "../../containers/ResultsContainer";
import CommentsContainer from "../../containers/CommentsContainer";
import { formatResults } from "../../services/formatResults.js";
import { Header, Icon, Image, Transition } from "semantic-ui-react";

class ChallengeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {},
      voted: null,
      teamVotedFor: null
    };
  }

  componentDidMount() {
    this.formatChallengeResults();
  }

  formatChallengeResults = () => {
    const results = formatResults(this.props.challenge, this.props.currentUser);
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
      this.formatChallengeResults();
      this.setState({
        voted: true,
        challenge: {
          ...this.state.challenge,
          voter: { voted: true, team: teamVotedFor }
        }
      });
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Header
          style={{ padding: "20px", paddingBottom: "0px" }}
          centered
          as="h2"
          icon
          textAlign="center"
        >
          <Icon name="trophy" circular />
          {this.props.challenge ? this.props.challenge.name : ""}
        </Header>
        <Header style={{ padding: "0px" }} centered as="h4" textAlign="center">
          {this.props.challenge ? this.props.challenge.description : ""}
        </Header>
        <Header style={{ padding: "0px" }} centered as="h4" textAlign="center">
          {this.state.challenge.voter
            ? this.state.voted
              ? `You already voted for Team ${this.state.challenge.voter.team}`
              : "Didn't Vote"
            : ""}
        </Header>
        {this.state.challenge.teamOne ? (
          <ResultsContainer
            challenge={this.state.challenge}
            handleVote={this.handleVote}
          />
        ) : (
          ""
        )}
        <CommentsContainer />
      </div>
    );
  }
}

export default ChallengeView;
