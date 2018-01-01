import React from "react";
import { Image, Form, Button, Grid } from "semantic-ui-react";
import ChallengeCard from "../challengeIndex/ChallengeCard";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      image_url: "",
      tagline: "",
      user: {},
      userChallenges: [],
      completedUserChallenges: [],
      showUserChallenges: true,
      showCompletedUserChallenges: true
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    // this.setState({
    //   user: this.props.users.filter(user => {
    //     return user.id === this.props.id;
    //   })
    // });

    // const mapped = this.props.challenges.map(challenge => {
    //   challenge.user_challenges.some(category => {
    //     if (category.user_id === this.props.currUser[0].id) {
    //       challenge["containsUser"] = true;
    //     }
    //   });
    // });
    this.updateChallenges();
  }

  updateChallenges = () => {
    const user = this.props.users.filter(user => {
      return user.id === this.props.id;
    });
    const mapped = this.props.challenges.filter(challenge => {
      return challenge.user_challenges.some(category => {
        return category.user_id === user[0].id;
      });
    });
    const userChallenges = mapped.filter(challenge => {
      return challenge.completed !== true;
    });
    const completedUserChallenges = mapped.filter(challenge => {
      return challenge.completed === true;
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

  addImage = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      image_url: this.state.image_url
    };

    fetch(`${this.props.url}users/${this.state.user[0].id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => this.props.fetchUser());
  };

  addTagline = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      tagline: this.state.tagline
    };

    fetch(`${this.props.url}users/${this.state.user[0].id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => this.props.fetchUser());
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.state.user);
    const UserChallenges = this.state.userChallenges.map((challenge, id) => {
      return (
        <ChallengeCard
          user={this.state.user[0].id}
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
            user={this.state.user[0].id}
            color="green"
            key={challenge.id}
            challenge={challenge}
          />
        );
      }
    );
    return this.state.user[0] !== undefined ? (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <h2>{this.state.user[0].username}</h2>
              {this.state.tagline !== "" ? (
                <div>
                  <h3>Tagline: {this.state.tagline}</h3>
                  <Form onSubmit={this.addTagline}>
                    <Form.Field onChange={this.handleChange}>
                      <label>Change Tagline</label>
                      <input name="tagline" placeholder="New Saying" />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                  </Form>
                </div>
              ) : (
                <div>
                  <h3>Tagline: {this.state.user[0].tagline}</h3>
                  <Form onSubmit={this.addTagline}>
                    <Form.Field onChange={this.handleChange}>
                      <label>Change Tagline</label>
                      <input name="tagline" placeholder="New Saying" />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                  </Form>
                </div>
              )}
              {this.state.user[0].image_url === null ||
              this.state.user[0].image_url === "" ? (
                <div>
                  <Image
                    centered
                    src="http://donatered-asset.s3.amazonaws.com/assets/default/default_user-884fcb1a70325256218e78500533affb.jpg"
                  />
                  <Form onSubmit={this.addImage}>
                    <Form.Field onChange={this.handleChange}>
                      <label>New Image Url</label>
                      <input name="image_url" placeholder="Enter Url" />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                  </Form>
                </div>
              ) : this.state.image_url !== "" ? (
                <div>
                  <Image centered src={this.state.image_url} />
                  <Form onSubmit={this.addImage}>
                    <Form.Field onChange={this.handleChange}>
                      <label>New Image Url</label>
                      <input name="image_url" placeholder="Enter Url" />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                  </Form>
                </div>
              ) : (
                <div>
                  <Image centered src={this.state.user[0].image_url} />
                  <Form onSubmit={this.addImage}>
                    <Form.Field onChange={this.handleChange}>
                      <label>New Image Url</label>
                      <input name="image_url" placeholder="Enter Url" />
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                  </Form>
                </div>
              )}
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
      </div>
    ) : (
      ""
    );
  }
}

export default Profile;
