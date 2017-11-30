import React from "react";

class Participant extends React.Component {
  render() {
    return <div>{this.props.part.name}</div>;
  }
}

export default Participant;
