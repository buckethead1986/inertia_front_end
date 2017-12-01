import React, { Component } from "react";

import TeamCard from "../components/showChallenge/TeamCard.js";
import TeamMembers from "../components/showChallenge/TeamMembers";
import { formatResults } from "../services/formatResults.js";

const firstTeam = [
  { name: "ade" },
  { name: "chris" },
  { name: "christian" },
  { name: "daniel" },
  { name: "elliot" },
  { name: "helen" }
];
const secondTeam = [
  { name: "nick" },
  { name: "robert" },
  { name: "john" },
  { name: "sue" }
];
const spectators = [
  { name: "john" },
  { name: "sara" },
  { name: "sam" },
  { name: "logan" }
];

class ResultsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.challenge).length) {
      this.setState({
        challenge: nextProps.challenge
      });
    }
  }

  render() {
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
            />
          ) : (
            ""
          )}
        </div>
        <div className="team">
          {this.state.challenge.teamOne ? (
            <TeamCard
              users={this.state.challenge.teamTwo.participants}
              teamName={this.state.challenge.teamTwo.name}
              spectators={this.state.challenge.spectators}
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
