import React from "react";
import { Form } from "semantic-ui-react";

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
    const body = this.state;
    fetch("http://inertia-app.herokuapp.com/api/v1/auth", {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          console.log(this.props.history);
          localStorage.setItem("token", json.jwt);
          this.props.history.push("/");
        }
      });
  };

  render() {
    console.log("here");
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="username"
            onChange={this.handleChange}
            label="Username"
            placeholder="Username"
          />
          <Form.Input
            name="password"
            onChange={this.handleChange}
            label="Password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}
export default Signup;
