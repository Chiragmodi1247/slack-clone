import React from "react";
import styles from "./Styles";
import {
  withStyles,
  CssBaseline,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";

import firebase from "firebase";

class NewChat extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      message: null,
      serverError: false,
      overSmart: false
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Send A Message!
          </Typography>
          {this.state.overSmart ? (
            <Typography
              component="h5"
              variant="h6"
              className={classes.errorText}
            >
              Get a job in QA
            </Typography>
          ) : null}
          <form className={classes.form} onSubmit={e => this.submitNewChat(e)}>
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-username">
                Enter Your Friend's Email
              </InputLabel>
              <Input
                required
                className={classes.input}
                autoFocus
                onChange={e => this.userTyping("username", e)}
                id="new-chat-username"
              ></Input>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-message">
                Enter Your Message
              </InputLabel>
              <Input
                required
                className={classes.input}
                onChange={e => this.userTyping("message", e)}
                id="new-chat-message"
              ></Input>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Send
            </Button>
          </form>
          {this.state.serverError ? (
            <Typography
              component="h5"
              variant="h6"
              className={classes.errorText}
            >
              Unable to locate the user
            </Typography>
          ) : null}
        </Paper>
      </main>
    );
  }

  userTyping = (inputType, e) => {
    switch (inputType) {
      case "username":
        this.setState({ username: e.target.value });
        break;

      case "message":
        this.setState({ message: e.target.value });
        break;

      default:
        break;
    }
  };

  submitNewChat = async e => {
    e.preventDefault();

    if(this.state.username === this.props.userEmail){
      this.setState({overSmart: true,serverError: false})
      return
    }
    const userExists = await this.userExists();
    if (userExists) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createNewChat();
    } else {
      this.setState({ serverError: true, overSmart: false });
    }
  };

  createNewChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.username,
      message: this.state.message
    });
  };

  goToChat = () =>
    this.props.goToChatFn(this.buildDocKey(), this.state.message);

  buildDocKey = () => {
    return [firebase.auth().currentUser.email, this.state.username]
      .sort()
      .join(":");
  };

  chatExists = async () => {
    const docKey = this.buildDocKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    console.log(chat.exists);
    return chat.exists;
  };

  userExists = async () => {
    const userSnapshot = await firebase
      .firestore()
      .collection("users")
      .get();
    const exists = userSnapshot.docs
      .map(_doc => _doc.data().email)
      .includes(this.state.username);

    return exists;
  };
}

export default withStyles(styles)(NewChat);
