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

  // componentDidMount() {
  //   this.formatChallengeResults();
  // }
  //
  // formatChallengeResults = () => {
  //   const results = formatResults(this.props.challenge, this.props.currentUser);
  //   console.log("After Format Results, ", results);
  //   let stateObj;
  //   if (results.voter) {
  //     stateObj = {
  //       challenge: results,
  //       voted: results.voter.voted,
  //       teamVotedFor: results.voter.team
  //     };
  //   } else {
  //     stateObj = {
  //       challenge: results
  //     };
  //   }
  //   this.setState(stateObj);
  // };

  render() {
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
          {this.props.challenge.voter
            ? this.props.voted
              ? `You voted for Team ${this.props.challenge.voter.team}`
              : "You haven't voted yet"
            : ""}
        </Header>
        {this.props.challenge.teamOne ? (
          <ResultsContainer
            challenge={this.props.challenge}
            handleVote={this.props.handleVote}
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
