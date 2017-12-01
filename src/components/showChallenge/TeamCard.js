import React from "react";
import { Card, Icon, Image, Transition } from "semantic-ui-react";

import TeamMembers from "./TeamMembers";

class TeamCard extends React.Component {
  state = {
    visible: true
  };

  componentDidMount() {
    this.toggleVisibility();
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    // console.log(this.props);
    return (
      <Transition
        animation={"tada"}
        duration={500}
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
            <Card.Content extra>
              <TeamMembers
                users={this.props.spectators}
                defaultIcon={"user circle"}
                votes={this.props.votes}
              />
            </Card.Content>
          </Card>
        </div>
      </Transition>
    );
  }
}

export default TeamCard;
