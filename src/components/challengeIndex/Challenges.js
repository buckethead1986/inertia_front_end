import React from "react";
import ChallengeCard from "./ChallengeCard";
import { Grid } from "semantic-ui-react";

class Challenges extends React.Component {
  constructor() {
    super();
    this.state = {
      challenges: [],
      userChallenges: [],
      completedUserChallenges: [],
      otherChallenges: [],
      otherCompletedChallenges: [],
      showUserChallenges: true,
      showCompletedUserChallenges: true,
      showOtherChallenges: true,
      showOtherCompletedChallenges: true
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
      if (challenge.criteria < now && challenge.completed !== true) {
        challenge["completed"] = true;
        this.completeChallenge();
      }
      return challenge.user_challenges.some(category => {
        if (category.user_id === this.props.currUser[0].id) {
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

  completeChallenge = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      completed: true
    };
    fetch(`${this.props.url}challenges`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  //checks if current user participated in a challenge, if the challenge is completed, and updates state of those categories.
  updateChallenges = () => {
    console.log(this.state);
    const userChallenges = this.state.challenges.filter(challenge => {
      return (
        challenge.hasOwnProperty("containsUser") &&
        challenge.completed === false
      );
    });
    const completedUserChallenges = this.state.challenges.filter(challenge => {
      return (
        challenge.hasOwnProperty("containsUser") && challenge.completed === true
      );
    });
    const otherChallenges = this.state.challenges.filter(challenge => {
      return (
        !challenge.hasOwnProperty("containsUser") &&
        challenge.completed === false
      );
    });
    const otherCompletedChallenges = this.state.challenges.filter(challenge => {
      return (
        !challenge.hasOwnProperty("containsUser") &&
        challenge.completed === true
      );
    });
    this.setState({
      userChallenges,
      completedUserChallenges,
      otherChallenges,
      otherCompletedChallenges
    });
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
  showOtherChallenges = e => {
    this.setState(prevState => {
      return { showOtherChallenges: !prevState.showOtherChallenges };
    });
  };
  showOtherCompletedChallenges = e => {
    this.setState(prevState => {
      return {
        showOtherCompletedChallenges: !prevState.showOtherCompletedChallenges
      };
    });
  };

  render() {
    const UserChallenges = this.state.userChallenges.map((challenge, id) => {
      return (
        <ChallengeCard
          color="blue"
          key={challenge.id}
          challenge={challenge}
          user={this.props.currUser.id}
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
            user={this.props.currUser.id}
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
          user={this.props.currUser.id}
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
            user={this.props.currUser.id}
          />
        );
      }
    );

    //looks complex, but its the same thing 4 times.  Shows and hides current user challenges, completed user challenges, current other challenges, and completed other challenges, based on state.
    return this.props.currUser.length !== 0 ? (
      <Grid>
        <Grid.Row>
          {this.state.showUserChallenges ? (
            <Grid.Column width={4}>
              <div>
                <h3 onClick={this.showUserChallenges}>
                  Your Current Challenges
                </h3>
                {UserChallenges}
              </div>
            </Grid.Column>
          ) : (
            <Grid.Column width={4}>
              <h3 onClick={this.showUserChallenges}>Your Current Challenges</h3>
            </Grid.Column>
          )}
          {this.state.showCompletedUserChallenges ? (
            <Grid.Column width={4}>
              <div>
                <h3 onClick={this.showCompletedUserChallenges}>
                  Your Completed Challenges
                </h3>
                {CompletedUserChallenges}
              </div>
            </Grid.Column>
          ) : (
            <Grid.Column width={4}>
              <h3 onClick={this.showCompletedUserChallenges}>
                Your Completed Challenges
              </h3>
            </Grid.Column>
          )}
          {this.state.showOtherChallenges ? (
            <Grid.Column width={4}>
              <div>
                <h3 onClick={this.showOtherChallenges}>Other Challenges</h3>
                {OtherChallenges}
              </div>
            </Grid.Column>
          ) : (
            <Grid.Column width={4}>
              <h3 onClick={this.showOtherChallenges}>Other Challenges</h3>
            </Grid.Column>
          )}
          {this.state.showOtherCompletedChallenges ? (
            <Grid.Column width={4}>
              <div>
                <h3 onClick={this.showOtherCompletedChallenges}>
                  Other Completed Challenges
                </h3>
                {OtherCompletedChallenges}
              </div>
            </Grid.Column>
          ) : (
            <Grid.Column width={4}>
              <h3 onClick={this.showOtherCompletedChallenges}>
                Other Completed Challenges
              </h3>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    ) : (
      ""
    );
  }
}
export default Challenges;
