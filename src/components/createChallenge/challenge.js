import React from "react";
import ChallengeForm from "./challenge_form";

class Challenge extends React.Component {
  render() {
    return (
      <div>
        <ChallengeForm users={this.props.users} url={this.props.url} />
      </div>
    );
  }
}

export default Challenge;
