import React from "react";
import { Image, Form, Button, Grid } from "semantic-ui-react";

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      image_url: "",
      tagline: "",
      thisUser: {}
    };
  }

  componentDidMount() {
    this.setState({
      thisUser: this.props.users.filter(user => {
        return user.id === this.props.id;
      })
    });
  }

  addImage = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      image_url: this.state.image_url,
      tagline: this.state.thisUser[0].tagline
    };

    fetch(`${this.props.url}users/${this.state.thisUser[0].id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => this.props.fetchUser());
  };

  addTagline = () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const body = {
      image_url: this.state.thisUser[0].image_url,
      tagline: this.state.tagline
    };

    fetch(`${this.props.url}users/${this.state.thisUser[0].id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(body)
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
    return this.state.thisUser[0] !== undefined ? (
      <div>
        <h2>{this.state.thisUser[0].username}</h2>
        <Grid>
          <Grid.Column width={6}>
            {this.state.tagline !== "" ? (
              <div>
                <h3>Tagline: {this.state.tagline}</h3>
                <Form onSubmit={this.addTagline}>
                  <Form.Field onChange={this.handleChange}>
                    <label>Change Tagline</label>
                    <input name="tagline" placeholder="New Saying" />
                  </Form.Field>
                  <Button type="submit">Submit</Button>
                </Form>
              </div>
            ) : (
              <div>
                <h3>Tagline: {this.state.thisUser[0].tagline}</h3>
                <Form onSubmit={this.addTagline}>
                  <Form.Field onChange={this.handleChange}>
                    <label>Change Tagline</label>
                    <input name="tagline" placeholder="New Saying" />
                  </Form.Field>
                  <Button type="submit">Submit</Button>
                </Form>
              </div>
            )}
            {this.state.thisUser[0].image_url === null ||
            this.state.thisUser[0].image_url === "" ? (
              <div>
                <Image
                  centered
                  src="http://donatered-asset.s3.amazonaws.com/assets/default/default_user-884fcb1a70325256218e78500533affb.jpg"
                />
                <Form onSubmit={this.addImage}>
                  <Form.Field onChange={this.handleChange}>
                    <label>New Image Url</label>
                    <input name="image_url" placeholder="Enter Url" />
                  </Form.Field>
                  <Button type="submit">Submit</Button>
                </Form>
              </div>
            ) : this.state.image_url !== "" ? (
              <div>
                <Image centered src={this.state.image_url} />
                <Form onSubmit={this.addImage}>
                  <Form.Field onChange={this.handleChange}>
                    <label>New Image Url</label>
                    <input name="image_url" placeholder="Enter Url" />
                  </Form.Field>
                  <Button type="submit">Submit</Button>
                </Form>
              </div>
            ) : (
              <div>
                <Image centered src={this.state.thisUser[0].image_url} />
                <Form onSubmit={this.addImage}>
                  <Form.Field onChange={this.handleChange}>
                    <label>New Image Url</label>
                    <input name="image_url" placeholder="Enter Url" />
                  </Form.Field>
                  <Button type="submit">Submit</Button>
                </Form>
              </div>
            )}
          </Grid.Column>
          <Grid.Column width={6} />
          <Grid.Column width={6} />
        </Grid>
      </div>
    ) : (
      ""
    );
  }
}

export default Profile;
