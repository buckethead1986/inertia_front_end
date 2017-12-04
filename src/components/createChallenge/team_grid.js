import React from "react";
import { Grid } from "semantic-ui-react";
import Participant from "./participant";

class TeamGrid extends React.Component {
  filterTeam = team_id => {
    const Team = this.props.participants
      .filter(part => {
        return part.role === team_id;
      })
      .map((part, id) => {
        return (
          <li key={id}>
            <Participant part={part} />
          </li>
        );
      });
    return Team;
  };

  render() {
    return (
      <Grid columns={3}>
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
            <ul>{this.filterTeam(1)}</ul>
          </Grid.Column>
          <Grid.Column>
            <ul>{this.filterTeam(2)}</ul>
          </Grid.Column>
          <Grid.Column>
            <ul>{this.filterTeam(3)}</ul>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default TeamGrid;
