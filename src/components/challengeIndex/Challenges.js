import React from "react";
import ChallengeCard from "./ChallengeCard";
import { Grid } from "semantic-ui-react";
import DateTime from "react-datetime";

class Challenges extends React.Component {
  constructor() {
    super();
    this.state = {
      challenges: [],
      userChallenges: [],
      otherChallenges: [],
      completedUserChallenges: [],
      otherCompletedChallenges: []
    };
  }

  componentDidMount() {
    fetch(`${this.props.url}challenges`)
      .then(res => res.json())
      .then(json =>
        this.setState(
          {
            challenges: json
          },
          () => this.filterChallenges(json)
        )
      );
  }

  //adds key of 'completed:true' if the criteria date has been passed, and 'containsUser:true' if the current user participated in the challenge.
  //used for filtering challenges (this users, challenges this user has completed)
  filterChallenges = json => {
    //the time right now
    let now = new Date().toISOString();
    //check challenge.criteria for deadline, and challenge.user_challenges.user_id === current user id.
    json.map(challenge => {
      if (challenge.criteria < now) {
        challenge["completed"] = true;
      }
      return challenge.user_challenges.some(category => {
        if (category.user_id === this.props.currentUser.id) {
          challenge["containsUser"] = true;
        }
      });
    });
    this.setState(
      {
        challenges: json
      },
      () => {
        this.updateChallenges();
      }
    );
  };

  //checks if current user participated in a challenge, if the challenge is completed, and updates state of those categories.
  updateChallenges = () => {
    const userChallenges = this.state.challenges.filter(challenge => {
      return (
        challenge.hasOwnProperty("containsUser") &&
        !challenge.hasOwnProperty("completed")
      );
    });
    const completedUserChallenges = this.state.challenges.filter(challenge => {
      return (
        challenge.hasOwnProperty("containsUser") &&
        challenge.hasOwnProperty("completed")
      );
    });
    const otherChallenges = this.state.challenges.filter(challenge => {
      return !challenge.hasOwnProperty("containsUser");
    });
    const otherCompletedChallenges = this.state.challenges.filter(challenge => {
      return (
        !challenge.hasOwnProperty("containsUser") &&
        challenge.hasOwnProperty("completed")
      );
    });
    this.setState(
      {
        userChallenges: userChallenges,
        completedUserChallenges: completedUserChallenges,
        otherChallenges: otherChallenges,
        otherCompletedChallenges: otherCompletedChallenges
      },
      () => console.log(this.state)
    );
  };

  // checkWin = () => {
  //   let now = new Date().toISOString();
  //   const completedChallenges = this.state.userChallenges.map(challenge => {
  //     if (challenge.criteria < now) {
  //       challenge["completed"] = true;
  //     }
  //   });
  //   console.log(this.state.userChallenges);
  // };

  render() {
    const UserChallenges = this.state.userChallenges.map((challenge, id) => {
      return (
        <ChallengeCard
          color="blue"
          key={challenge.id}
          challenge={challenge}
          user={this.props.currentUser.id}
        />
      );
    });
    const CompletedUserChallenges = this.state.completedUserChallenges.map(
      (challenge, id) => {
        return (
          <ChallengeCard
            color="green"
            key={challenge.id}
            challenge={challenge}
            user={this.props.currentUser.id}
          />
        );
      }
    );
    const OtherChallenges = this.state.otherChallenges.map((challenge, id) => {
      return (
        <ChallengeCard
          color="red"
          key={challenge.id}
          challenge={challenge}
          user={this.props.currentUser.id}
        />
      );
    });
    const OtherCompletedChallenges = this.state.otherCompletedChallenges.map(
      (challenge, id) => {
        return (
          <ChallengeCard
            color="purple"
            key={challenge.id}
            challenge={challenge}
            user={this.props.currentUser.id}
          />
        );
      }
    );

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <div>
              <h3>Your Current Challenges</h3>
              {UserChallenges}
            </div>
          </Grid.Column>
          <Grid.Column width={4}>
            <div>
              <h3>Your Completed Challenges</h3>
              {CompletedUserChallenges}
            </div>
          </Grid.Column>
          <Grid.Column width={4}>
            <div>
              <h3>Other Challenges</h3>
              {OtherChallenges}
            </div>
          </Grid.Column>
          <Grid.Column width={4}>
            <div>
              <h3>Other Completed Challenges</h3>
              {OtherCompletedChallenges}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default Challenges;
