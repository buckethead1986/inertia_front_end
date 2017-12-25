import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import TeamCard from "../components/showChallenge/TeamCard.js";
import TeamMembers from "../components/showChallenge/TeamMembers";

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
    return (
      <div>
        <Grid>
          <Grid.Row>
            {this.state.challenge.teamOne ? (
              <Grid.Column width={6}>
                <TeamCard
                  users={this.state.challenge.teamOne.participants}
                  teamName={this.state.challenge.teamOne.name}
                  spectators={this.state.challenge.spectators}
                  votes={this.state.challenge.spectators.votedTeamOne}
                  onTeamOne
                  currentVoter={this.state.challenge.voter}
                  handleVote={this.props.handleVote}
                  completed={this.props.completed}
                />
              </Grid.Column>
            ) : (
              ""
            )}
            {this.state.challenge.spectators ? (
              <Grid.Column width={4}>
                <TeamMembers
                  users={this.state.challenge.spectators.users}
                  spectatorList={true}
                />
              </Grid.Column>
            ) : (
              ""
            )}
            {this.state.challenge.teamTwo ? (
              <Grid.Column width={6}>
                <TeamCard
                  users={this.state.challenge.teamTwo.participants}
                  teamName={this.state.challenge.teamTwo.name}
                  spectators={this.state.challenge.spectators}
                  votes={this.state.challenge.spectators.votedTeamTwo}
                  onTeamTwo
                  currentVoter={this.state.challenge.voter}
                  handleVote={this.props.handleVote}
                  completed={this.props.completed}
                />
              </Grid.Column>
            ) : (
              ""
            )}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default ResultsContainer;
