import React from "react";
import { Card, Icon, Image, Transition, Button } from "semantic-ui-react";

import TeamMembers from "./TeamMembers";

class TeamCard extends React.Component {
  state = {
    visible: true,
    teamVotedFor: null
  };

  componentDidMount() {
    this.toggleVisibility();
    this.checkCurrentVoter();
  }

  checkCurrentVoter = () => {
    if (this.props.currentVoter) {
      let team;
      if (this.props.currentVoter.team === 1) {
        team = 1;
      } else if (this.props.currentVoter.team === 2) {
        team = 2;
      }

      this.setState({
        teamVotedFor: team
      });
    }
  };

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  handleClick = () => {
    if (this.props.onTeamOne) {
      this.props.handleVote(1);
    } else {
      this.props.handleVote(2);
    }
  };

  render() {
    return (
      <Transition
        animation={"tada"}
        duration={2500}
        visible={this.state.visible}
      >
        <div>
          <Card>
            <Image />
            <Card.Content>
              <Card.Header>{this.props.teamName}</Card.Header>
              <Card.Meta>
                <span className="date">
                  {this.props.users.length} participants
                </span>
              </Card.Meta>
              <Card.Description>
                <TeamMembers users={this.props.users} />
              </Card.Description>
            </Card.Content>
            {this.props.currentVoter ? (
              !this.props.currentVoter.team ? (
                <Button content="Like" onClick={this.handleClick} />
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <Card.Content extra>
              {this.props.onTeamOne ? (
                <TeamMembers
                  users={this.props.spectators.votedTeamOne}
                  defaultIcon={"user circle"}
                  votes={this.props.spectators.votedTeamOne.length}
                  voting
                  teamVotedFor={this.state.teamVotedFor}
                  teamOne={true}
                />
              ) : (
                <TeamMembers
                  users={this.props.spectators.votedTeamTwo}
                  defaultIcon={"user circle"}
                  votes={this.props.spectators.votedTeamTwo.length}
                  voting
                  teamVotedFor={this.state.teamVotedFor}
                  teamOne={false}
                />
              )}
            </Card.Content>
          </Card>
        </div>
      </Transition>
    );
  }
}

export default TeamCard;
