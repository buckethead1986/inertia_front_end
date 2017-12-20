import React from "react";
import { Image, Form, Button, Grid } from "semantic-ui-react";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      image_url: "",
      tagline: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.image_url !== this.props.image_url) {
      this.setState({
        image_url: nextProps.image_url
      });
    }
  }

  addImage = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      image_url: this.state.image_url
      // tagline: this.state.tagline
    };

    fetch(`${this.props.url}users/${this.props.currentUser[0].id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        image_url: this.state.image_url
        // tagline: this.state.tagline
      })
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
    console.log(this.props.currentUser[0]);
    console.log(this.state);

    // debugger;
    return this.props.currentUser[0] !== undefined ? (
      <div>
        <h2>{this.props.currentUser[0].username}</h2>
        <h3>{this.props.currentUser[0].tagline}</h3>
        <Grid>
          <Grid.Row>
            {this.props.currentUser[0].image_url === null ||
            this.props.currentUser[0].image_url === "" ? (
              <Grid.Column width={6}>
                <Image
                  centered
                  src="http://donatered-asset.s3.amazonaws.com/assets/default/default_user-884fcb1a70325256218e78500533affb.jpg"
                />
              </Grid.Column>
            ) : (
              <Grid.Column width={6}>
                <Image centered src={this.props.currentUser[0].image_url} />
              </Grid.Column>
            )}
            <Grid.Column width={5}>
              <Form onSubmit={this.addImage}>
                <Form.Field onChange={this.handleChange}>
                  <label>Change Tagline</label>
                  <input name="tagline" placeholder="New Saying" />
                </Form.Field>
                <Form.Field onChange={this.handleChange}>
                  <label>New Image Url</label>
                  <input name="image_url" placeholder="Enter Url" />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    ) : (
      ""
    );
  }
}

export default Profile;
