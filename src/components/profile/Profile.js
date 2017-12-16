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

  addImage = () => {
    console.log(this.props);
    console.log(this.state);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      tagline: this.state.tagline,
      image_url: this.state.image_url
    };
    console.log(body);
    fetch(`${this.props.url}users/${this.props.currentUser.id}`, {
      method: "PATCH",
      heders: headers,
      body: JSON.stringify({
        user: {
          tagline: this.state.tagline,
          image_url: this.state.image_url
        }
      })
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <Image
                centered
                src="http://donatered-asset.s3.amazonaws.com/assets/default/default_user-884fcb1a70325256218e78500533affb.jpg"
              />
            </Grid.Column>
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
        {this.props.currentUser.username}
      </div>
    );
  }
}

export default Profile;
