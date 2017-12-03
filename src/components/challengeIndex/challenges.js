import React from "react";
import { Redirect } from "react-router";

class Challenges extends React.Component {
  constructor() {
    super();
    this.state = {
      fireRedirect: false
    };
  }

  submitForm = e => {
    e.preventDefault();
    this.setState({ fireRedirect: true });
  };
  render() {
    const { from } = this.props.location.state || "/";
    const { fireRedirect } = this.state;
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <button type="submit">Make a new Challenge</button>
        </form>
        {fireRedirect && <Redirect to={from || "/challenge/new"} />}
      </div>
    );
  }
}
export default Challenges;
