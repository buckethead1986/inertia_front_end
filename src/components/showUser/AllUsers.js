import React from "react";
import SearchDropdown from "../createChallenge/SearchDropdown";
import { Card, Icon, Image, Transition, Button } from "semantic-ui-react";

class AllUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      passedUsers: []
    };
  }

  componentDidMount() {
    fetch(`${this.props.url}users`)
      .then(res => res.json())
      .then(json =>
        this.setState({
          users: json
        })
      );
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.state.passedUsers !== this.props.users) {
  //     this.setState({
  //       passedUsers: nextProps.users
  //     });
  //   }
  // }

  changeUser = (e, data) => {
    this.setState({
      currentSelectedUser: data.value
    });
  };

  render() {
    console.log(this.state);
    const UserCards = this.state.users.map(user => {
      let color = "";
      if (user.id % 4 === 0) {
        color = "blue";
      } else if (user.id % 4 === 3) {
        color = "green";
      } else if (user.id % 4 === 2) {
        color = "purple";
      } else if (user.id % 4 === 1) {
        color = "red";
      }
      return (
        <Card color={color} onClick={() => this.props.showUser(user.id)}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="/assets/images/avatar/large/steve.jpg"
            />
            <Card.Header>{user.username}</Card.Header>
            <Card.Meta>Super Cool</Card.Meta>
            <Card.Description>
              Involved in {user.user_challenges.length} challenges
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
    return (
      <div>
        <SearchDropdown
          changeUser={this.changeUser}
          label="Select User"
          title="Select User"
          data={this.state.users}
        />
        <Card.Group>{UserCards}</Card.Group>
      </div>
    );
  }
}

export default AllUsers;
