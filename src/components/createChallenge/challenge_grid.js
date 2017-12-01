import React from "react";
import { Grid } from "semantic-ui-react";
import PickDate from "./date_picker";

class ChallengeGrid extends React.Component {
  render() {
    return this.props.deadline === true ? (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <div onChange={this.props.changeName}>
              Name <br />
              <input type="text" />
            </div>
            <div onChange={this.props.changeTeamAName}>
              Team A Name <br />
              <input type="text" />
            </div>
            <div onChange={this.props.changeTeamBName}>
              Team B Name <br />
              <input type="text" />
            </div>
            <div onChange={this.props.changeDescription}>
              Description <br />
              <textarea />
            </div>
            <br />
          </Grid.Column>
          <Grid.Column width={10}>
            <PickDate changeDeadline={this.props.changeDeadline} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <div onChange={this.props.changeName}>
              Name <br />
              <input type="text" />
            </div>
            <div onChange={this.props.changeTeamAName}>
              Team A Name <br />
              <input type="text" />
            </div>
            <div onChange={this.props.changeTeamBName}>
              Team B Name <br />
              <input type="text" />
            </div>
            <div onChange={this.props.changeDescription}>
              Description <br />
              <textarea />
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
