import React, { Component } from "react";
import { Button, Comment, Form } from "semantic-ui-react";

class CommentsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      commentValue: ""
    };
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
    fetch(`${this.props.url}comments`)
      .then(res => res.json())
      .then(json => this.getCommentsForChallenge(json));
  };

  getCommentsForChallenge = results => {
    const filteredComments = results.filter(comment => {
      return comment.challenge_id === this.props.challengeNumber;
    });
    this.setState({
      comments: filteredComments
    });
  };

  postComment = () => {
    const body = {
      content: this.state.commentValue,
      user_id: this.props.currUser[0].id,
      challenge_id: this.props.challengeNumber
    };
    fetch(`${this.props.url}comments`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(body)
    }).then(res => this.resetText());
  };

  resetText = () => {
    this.fetchComments();
    this.setState({
      commentValue: ""
    });
  };

  handleClick = e => {
    this.postComment();
  };

  handleChange = e => {
    this.setState({
      commentValue: e.target.value
    });
  };

  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div style={{ margin: "40px", paddingTop: "0px" }}>
        <Comment.Group>
          {this.state.comments.map((comment, index) => {
            return (
              <Comment key={index}>
                <Comment.Content>
                  <Comment.Author>{comment.user.username}</Comment.Author>
                  <Comment.Text>
                    <p>{comment.content}</p>
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            );
          })}

          <Form reply>
            <Form.TextArea
              value={this.state.commentValue}
              onChange={this.handleChange}
            />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
              onClick={this.handleClick}
            />
          </Form>
        </Comment.Group>
      </div>
    );
  }
}

export default CommentsContainer;
