import React, { Component } from "react";

import Challenge from "../components/createChallenge/challenge";

class InertiaContainer extends Component {
  render() {
    return (
      <div>
        <Challenge users={this.props.users} />
      </div>
    );
  }
}

export default InertiaContainer;
