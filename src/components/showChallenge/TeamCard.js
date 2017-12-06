import React from "react";
import { Card, Icon, Image, Transition, Button } from "semantic-ui-react";

import TeamMembers from "./TeamMembers";

class TeamCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      teamVotedFor: null,
      users: []
    };
  }

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

  componentDidMount() {
    const newArray = [];
    const userIds = [];
    this.props.users.forEach(user => {
      if (!userIds.includes(user.id)) newArray.push(user);
      userIds.push(user.id);
    });
    this.setState({
      users: newArray
    });
  }

  render() {
    return (
      <Transition
        animation={"tada"}
        duration={2500}
        visible={this.state.visible}
      >
        <div>
          <Card centered color={this.props.onTeamOne ? "green" : "blue"}>
            <Image />
            <Card.Content>
              <Card.Header>{this.props.teamName}</Card.Header>
              <Card.Meta>
                <span className="date">
                  {this.state.users.length} participants
                </span>
              </Card.Meta>
              <Card.Description>
                <TeamMembers users={this.state.users} />
              </Card.Description>
            </Card.Content>
            {this.props.currentVoter ? (
              !this.props.currentVoter.team ? (
                <Button
                  content="Vote"
                  disabled={this.props.completed}
                  onClick={this.handleClick}
                />
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
