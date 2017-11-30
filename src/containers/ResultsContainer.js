import React, { Component } from "react";

import TeamCard from "../components/showChallenge/TeamCard.js";

const firstTeam = ["ade", "chris", "christian", "daniel", "elliot", "helen"];
const secondTeam = ["nick", "robert", "john", "sue"];
const spectators = ["john", "sara", "sam", "logan"];

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
    console.log(this.state);
    return (
      <div className="team container">
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
        <div>Spectators</div>
      </div>
    );
  }
}

export default ResultsContainer;
