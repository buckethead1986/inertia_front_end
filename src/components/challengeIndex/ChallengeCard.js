import React from "react";
import { Card, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class ChallengeCard extends React.Component {
  constructor() {
    super();

    this.state = {
      role: ""
    };
  }

  componentDidMount = () => {
    this.props.challenge.user_challenges.forEach(uc => {
      if (
        uc.user_id === this.props.user ||
        uc.user_id === this.props.thisUser
      ) {
        switch (uc.role) {
          case "3":
            this.setState({
              role: "Spectator"
            });
            break;
          default:
            this.setState({
              role: "Participant"
            });
        }
      }
    });
  };

  render() {
    return (
      <Card
        centered
        color={this.props.color}
        onClick={() =>
          this.props.history.push(`/challenges/${this.props.challenge.id}`)}
      >
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="http://images.clipartpanda.com/challenge-clipart-k15443406.jpg"
          />
          <Card.Header>{this.props.challenge.name}</Card.Header>
          <Card.Meta>{this.state.role}</Card.Meta>
          <Card.Description>
            {this.props.challenge.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(ChallengeCard);
