import React from "react";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      imageUrl: ""
    };
  }

  addImage = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      imageUrl: this.state.imageUrl
    };
    fetch(`${this.props.url}/users`, {
      method: "POST",
      heders: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  render() {
    return <div>{this.props.currentUser.username}</div>;
  }
}

export default Profile;
