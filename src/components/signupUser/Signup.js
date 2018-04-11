import React from "react";
import { Form, Grid } from "semantic-ui-react";

const styles = {
  textAlign: "left",
  align: "left",
  maxWidth: "600px",
  margin: "0 auto",
  fontSize: "20px"
};

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = Object.assign({}, this.state, {
      image_url:
        "http://donatered-asset.s3.amazonaws.com/assets/default/default_user-884fcb1a70325256218e78500533affb.jpg"
    });
    fetch(`${this.props.url}users`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          localStorage.setItem("token", json.jwt);
          this.props.history.push("/challenges");
        }
      })
      .then(this.handleSubmitted);
  };

  handleSubmitted = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = this.state;
    fetch(`${this.props.url}auth`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          localStorage.setItem("token", json.jwt);
          this.props.history.push("/challenges");
        }
      })
      .then(this.props.fetchUser());
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} />
            <Grid.Column width={5}>
              <div style={{ align: "center" }}>
                <p style={{ ...styles, fontSize: 24, textAlign: "center" }}>
                  Welcome to Inertial!
                </p>
                <p />
                <p style={styles}>
                  Inertial is a friendly challenge tracking and event planning
                  application. Challenge your friends to fun contests, plan
                  events, and chat about the upcoming event!
                </p>
                <p />
                <p style={styles}>
                  Create new challenges or events, add members to teams or just
                  spectate if they don't need a role, set a deadline, and allow
                  event participants to vote on the outcome and chat with each
                  other.
                </p>
              </div>
            </Grid.Column>
            <Grid.Column width={2} />
            <Grid.Column width={5}>
              <h2>Signup</h2>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group widths="12">
                  <Form.Input
                    name="username"
                    onChange={this.handleChange}
                    label="Username"
                    placeholder="Username"
                  />
                </Form.Group>
                <Form.Group widths="12">
                  <Form.Input
                    name="password"
                    onChange={this.handleChange}
                    label="Password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Button>Submit</Form.Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
export default Signup;
