import React from "react";
import { Card } from "semantic-ui-react";
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
      if (uc.user_id === this.props.user) {
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
        header={this.props.challenge.name}
        meta={this.state.role}
        description={this.props.challenge.description}
      />
    );
  }
}

export default withRouter(ChallengeCard);
