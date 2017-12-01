import React from "react";
import { Grid } from "semantic-ui-react";
import Participant from "./participant";

class TeamGrid extends React.Component {
  filterTeamA = () => {
    const TeamA = this.props.participants
      .filter(part => {
        return part.role === 1;
      })
      .map((part, id) => {
        return (
          <li key={id}>
            <Participant part={part} />
          </li>
        );
      });
    return TeamA;
  };

  filterTeamB = () => {
    const TeamB = this.props.participants
      .filter(part => {
        return part.role === 2;
      })
      .map((part, id) => {
        return (
          <li key={id}>
            <Participant part={part} />
          </li>
        );
      });
    return TeamB;
  };

  filterSpectators = () => {
    const Spectators = this.props.participants
      .filter(part => {
        return part.role === 3;
      })
      .map((part, id) => {
        return (
          <li key={id}>
            <Participant part={part} />
          </li>
        );
      });
    return Spectators;
  };

  render() {
    return (
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <h4>{this.props.teamNames[0]}</h4>
          </Grid.Column>
          <Grid.Column>
            <h4>{this.props.teamNames[1]}</h4>
          </Grid.Column>
          <Grid.Column>
            <h4>Spectators</h4>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <ul>{this.filterTeamA()}</ul>
          </Grid.Column>
          <Grid.Column>
            <ul>{this.filterTeamB()}</ul>
          </Grid.Column>
          <Grid.Column>
            <ul>{this.filterSpectators()}</ul>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default TeamGrid;
