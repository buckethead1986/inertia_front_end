import React, { Component } from "react";

import TeamCard from "../components/showChallenge/TeamCard.js";
import TeamMembers from "../components/showChallenge/TeamMembers";
import { formatResults } from "../services/formatResults.js";

class ResultsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {}
    };
  }

  componentWillMount() {
    if (Object.keys(this.props.challenge).length) {
      this.setState({
        challenge: this.props.challenge
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(this.props.challenge).length) {
      this.setState({
        challenge: this.props.challenge
      });
    }
  }

  render() {
    console.log(this.props.handleVote);
    return (
      <div className="team container">
        <div className="spectators">
          {this.state.challenge.spectators ? (
            <TeamMembers
              users={this.state.challenge.spectators.users}
              spectatorList={true}
            />
          ) : (
            ""
          )}
        </div>
        <div className="team">
          {this.state.challenge.teamOne ? (
            <TeamCard
              users={this.state.challenge.teamOne.participants}
              teamName={this.state.challenge.teamOne.name}
              spectators={this.state.challenge.spectators}
              votes={this.state.challenge.spectators.votedTeamOne}
              onTeamOne
              currentVoter={this.state.challenge.voter}
              handleVote={this.props.handleVote}
            />
          ) : (
            ""
          )}
        </div>
        <div className="team">
          {this.state.challenge.teamTwo ? (
            <TeamCard
              users={this.state.challenge.teamTwo.participants}
              teamName={this.state.challenge.teamTwo.name}
              spectators={this.state.challenge.spectators}
              votes={this.state.challenge.spectators.votedTeamTwo}
              onTeamTwo
              currentVoter={this.state.challenge.voter}
              handleVote={this.props.handleVote}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default ResultsContainer;
