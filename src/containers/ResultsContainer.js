import React, { Component } from "react";

import TeamCard from "../components/showChallenge/TeamCard.js";
import TeamMembers from "../components/showChallenge/TeamMembers";

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
      teamOne: {
        name: "The Avengers",
        participants: firstTeam,
        votes: 8
      },
      teamTwo: {
        name: "The Incredibles",
        participants: secondTeam,
        votes: 4
      },
      spectators: spectators
    };
  }

  render() {
    console.log(this.props.challenge);
    return (
      <div className="team container">
        <div className="spectators">
          <TeamMembers users={this.state.spectators} spectatorList={true} />
        </div>
        <div className="team">
          <TeamCard
            users={this.state.teamOne.participants}
            teamName={this.state.teamOne.name}
            votes={this.state.teamOne.votes}
            spectators={this.state.spectators}
          />
        </div>
        <div className="team">
          <TeamCard
            users={this.state.teamTwo.participants}
            teamName={this.state.teamTwo.name}
            votes={this.state.teamTwo.votes}
            spectators={this.state.spectators}
          />
        </div>
      </div>
    );
  }
}

export default ResultsContainer;
