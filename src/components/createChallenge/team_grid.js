import React from "react";
import { Grid, Image } from "semantic-ui-react";
import Participant from "./participant";

class GridExampleDividedNumber extends React.Component {
  filterTeamA = () => {
    const TeamA = this.props.participants
      .filter(part => {
        return part.team === "Team A";
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
        return part.team === "Team B";
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
        return part.team === "Spectator";
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
            <h4>Team A</h4>
          </Grid.Column>
          <Grid.Column>
            <h4>Team B</h4>
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

export default GridExampleDividedNumber;
