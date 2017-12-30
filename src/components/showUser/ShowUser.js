import React from "react";
import { Image, Grid } from "semantic-ui-react";
import ChallengeCard from "../challengeIndex/ChallengeCard";

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      userChallenges: [],
      completedUserChallenges: [],
      showUserChallenges: true,
      showCompletedUserChallenges: true
    };
  }

  componentDidMount() {
    const user = this.props.users.filter(user => {
      return user.id.toString() === this.props.location.pathname.split("/")[2];
    })[0];
    let now = new Date().toISOString();
    console.log(this.props.challenges);
    const mapped = this.props.challenges.map(challenge => {
      if (challenge.criteria < now) {
        challenge["completed"] = true;
      }
      challenge.user_challenges.some(category => {
        console.log(category, user);
        if (category.user_id === user.id) {
          challenge["containsUser"] = true;
        }
      });
    });
    this.updateChallenges(user);
  }

  //checks if current user participated in a challenge, if the challenge is completed, and updates state of those categories.
  updateChallenges = user => {
    const userChallenges = this.props.challenges.filter(challenge => {
      console.log(challenge);
      return (
        !(challenge.completed === true) &&
        challenge.hasOwnProperty("containsUser")
      );
    });
    const completedUserChallenges = this.props.challenges.filter(challenge => {
      return (
        challenge.completed === true && challenge.hasOwnProperty("containsUser")
      );
    });
    this.setState(
      {
        user,
        userChallenges,
        completedUserChallenges
      },
      () => console.log(this.state)
    );
  };

  showUserChallenges = e => {
    this.setState(prevState => {
      return { showUserChallenges: !prevState.showUserChallenges };
    });
  };
  showCompletedUserChallenges = e => {
    this.setState(prevState => {
      return {
        showCompletedUserChallenges: !prevState.showCompletedUserChallenges
      };
    });
  };

  render() {
    const UserChallenges = this.state.userChallenges.map((challenge, id) => {
      return (
        <ChallengeCard
          thisUser={this.state.user.id}
          color="blue"
          key={challenge.id}
          challenge={challenge}
        />
      );
    });
    const CompletedUserChallenges = this.state.completedUserChallenges.map(
      (challenge, id) => {
        return (
          <ChallengeCard
            thisUser={this.state.user.id}
            color="green"
            key={challenge.id}
            challenge={challenge}
          />
        );
      }
    );
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <h2>{this.state.user.username}</h2>
            {this.state.user.tagline ? (
              <h3>Tagline: {this.state.user.tagline}</h3>
            ) : (
              <h3>Tagline: No tagline</h3>
            )}
            <Image centered src={this.state.user.image_url} />
            <h4>Active Challenges: {this.state.userChallenges.length}</h4>
            <h4>
              Completed Challenges: {this.state.completedUserChallenges.length}
            </h4>
          </Grid.Column>
          <Grid.Column width={2} />
          {this.state.showUserChallenges ? (
            <Grid.Column width={4}>
              <div>
                <h3 onClick={this.showUserChallenges}>Current Challenges</h3>
                {UserChallenges}
              </div>
            </Grid.Column>
          ) : (
            <Grid.Column width={4}>
              <h3 onClick={this.showUserChallenges}>Current Challenges</h3>
            </Grid.Column>
          )}
          {this.state.showCompletedUserChallenges ? (
            <Grid.Column width={4}>
              <div>
                <h3 onClick={this.showCompletedUserChallenges}>
                  Completed Challenges
                </h3>
                {CompletedUserChallenges}
              </div>
            </Grid.Column>
          ) : (
            <Grid.Column width={4}>
              <h3 onClick={this.showCompletedUserChallenges}>
                Completed Challenges
              </h3>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    );
  }
}

export default User;
