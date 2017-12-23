import React from "react";
import UserSearchDropdown from "./UserSearchDropdown";
import { Card, Icon, Image, Transition, Button } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";

class AllUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      filteredUsers: [],
      currentSelectedUser: ""
    };
  }

  componentDidMount() {
    const filteredUsers = this.props.users.filter(user => {
      return user.id !== this.props.currUser.id;
    });
    this.setState({
      users: filteredUsers,
      filteredUsers: this.props.users
    });
  }

  //removes currently logged in user from list of other users.
  filterCurrentUser = () => {
    const filteredUserList = this.state.users.filter(user => {
      return user.id !== this.props.currUser.id;
    });
    return filteredUserList;
  };

  changeUserInput = (e, data) => {
    const filteredUsers = this.state.users.filter(user => {
      return (
        user.username.toLowerCase().includes(data.searchQuery.toLowerCase()) &&
        user.id !== this.props.currUser.id
      );
    });
    this.setState({
      filteredUsers: filteredUsers
    });
  };

  changeUser = (e, data) => {
    if (data.value !== 0) {
      this.props.showUser(data.value + 1);
    }
  };

  render() {
    const usersWithoutCurrentUser = this.state.users.filter(user => {
      return user.id !== this.props.currUser.id;
    });
    const UserCards = this.state.filteredUsers.map(user => {
      let color = "";
      if (user.id % 5 === 0) {
        color = "blue";
      } else if (user.id % 5 === 4) {
        color = "green";
      } else if (user.id % 5 === 3) {
        color = "yellow";
      } else if (user.id % 5 === 2) {
        color = "orange";
      } else if (user.id % 5 === 1) {
        color = "red";
      }
      return (
        <Card
          key={user.id}
          color={color}
          onClick={() => this.props.showUser(user.id)}
        >
          <Card.Content>
            {user.image_url !== null || user.image_url === "" ? (
              <Image floated="right" size="mini" src={user.image_url} />
            ) : (
              <Image
                floated="right"
                size="mini"
                src="http://donatered-asset.s3.amazonaws.com/assets/default/default_user-884fcb1a70325256218e78500533affb.jpg"
              />
            )}
            <Card.Header>{user.username}</Card.Header>
            <Card.Meta>Super Cool</Card.Meta>
            <Card.Description>
              {user.user_challenges.length === 1
                ? `Involved in ${user.user_challenges.length} challenge`
                : `Involved in ${user.user_challenges.length} challenges`}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width="13" />

            <Grid.Column width="3">
              <UserSearchDropdown
                onChange={this.changeUser}
                changeUserInput={this.changeUserInput}
                label="Select User"
                title="Select User"
                data={usersWithoutCurrentUser}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Card.Group>{UserCards}</Card.Group>
      </div>
    );
  }
}

export default AllUsers;
