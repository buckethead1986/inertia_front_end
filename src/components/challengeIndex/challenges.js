import React from "react";
import { Redirect } from "react-router";
import ChallengeCard from "./ChallengeCard";
import { Grid } from "semantic-ui-react";

class Challenges extends React.Component {
  constructor() {
    super();
    this.state = {
      challenges: [],
      userChallenges: [],
      otherChallenges: []
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
          () => this.OtherChallenges(json)
        )
      );
  }

  // UserChallenges = json => {
  //   return json.filter(challenge => {
  //     return challenge.user_challenges.some(category => {
  //       return category.user_id === this.props.currentUser.id;
  //     });
  //   });
  // };

  OtherChallenges = json => {
    json.map(challenge => {
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
      () => this.updateChallenges()
    );
  };

  updateChallenges = () => {
    const filteredChallenges = this.state.challenges.filter(challenge => {
      return challenge.hasOwnProperty("containsUser");
    });
    const unfilteredChallenges = this.state.challenges.filter(challenge => {
      return !challenge.hasOwnProperty("containsUser");
    });
    this.setState(
      {
        userChallenges: filteredChallenges,
        otherChallenges: unfilteredChallenges
      },
      () => console.log(this.state)
    );
  };

  // submitForm = e => {
  //   e.preventDefault();
  //   this.setState({ fireRedirect: true });
  // };

  render() {
    // console.log(this.state.userChallenges);
    // console.log(this.state.otherChallenges);
    const UserChallenges = this.state.userChallenges.map((challenge, id) => {
      return (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          user={this.props.currentUser.id}
        />
      );
    });
    const NonUserChallenges = this.state.otherChallenges.map(
      (challenge, id) => {
        return (
          <ChallengeCard
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
          <Grid.Column width={5}>
            <div>{UserChallenges}</div>
          </Grid.Column>
          <Grid.Column width={5}>
            <div>{NonUserChallenges}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
export default Challenges;
