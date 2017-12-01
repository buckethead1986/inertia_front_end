import React from "react";
import { Grid, Image } from "semantic-ui-react";
import PickDate from "./date_picker";

class ChallengeGrid extends React.Component {
  render() {
    return this.props.deadline ? (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <div>
              Name <input className="inputField" type="text" />
            </div>
            <div>
              Description <input type="text" />
            </div>
            <div onChange={this.changeTeamAName}>
              Team A Name <input type="text" />
            </div>
            <div onChange={this.changeTeamBName}>
              Team B Name <input type="text" />
            </div>
            <br />
          </Grid.Column>
          <Grid.Column width={10}>
            <PickDate />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <div>
              Name <input className="inputField" type="text" />
            </div>
            <div>
              Description <input type="text" />
            </div>
            <div onChange={this.changeTeamAName}>
              Team A Name <input type="text" />
            </div>
            <div onChange={this.changeTeamBName}>
              Team B Name <input type="text" />
            </div>
            <br />
          </Grid.Column>
          <Grid.Column width={10} />
        </Grid.Row>
      </Grid>
    );
  }
}

export default ChallengeGrid;
