import React from "react";

class User extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    fetch(`${this.props.url}users`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          user: json
        })
      );
  }

  render() {
    console.log(this.props.location.pathname.split("/")[2]);
    console.log(this.state);
    return <div>hey</div>;
  }
}

export default User;
