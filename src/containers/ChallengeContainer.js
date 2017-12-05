import React, { Component } from "react";
import ChallengeView from "../components/showChallenge/ChallengeView";

class ChallengeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      challenge: {}
    };
  }

  componentDidMount() {
    this.fetchChallenge();
  }

  componentDidUpdate() {
    this.userBelongsToChallenge();
  }

  userBelongsToChallenge = () => {
    if (this.state.challenge.name) {
      const userIds = this.state.challenge.user_challenges.map(uc => {
        return uc.user.id;
      });
      if (userIds.includes(this.props.currentUser.id)) {
        console.log(this.props);
      }
    }
  };

  fetchChallenge = () => {
    const id = window.location.href.split("/");
    const specific_id = id[id.length - 1];
    fetch(`${this.props.url}challenges/${specific_id}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          challenge: json
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.challenge.name ? (
          <ChallengeView challenge={this.state.challenge} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ChallengeContainer;
