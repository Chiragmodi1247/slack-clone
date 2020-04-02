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

class NewGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      groupName: null,
      serverError: false
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create/Join Channel
          </Typography>
          <Typography className={classes.errorText}>
            If group name already exists. Then you will be added to it.
          </Typography>
          <form className={classes.form} onSubmit={e => this.submitNewGroup(e)}>
            <FormControl fullWidth>
              <InputLabel htmlFor="new-chat-groupName">
                Enter Channel Name
              </InputLabel>
              <Input
                required
                className={classes.input}
                autoFocus
                onChange={e => this.userTyping("groupName", e)}
                id="new-chat-groupName"
              ></Input>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              Create/Join
            </Button>
          </form>
        </Paper>
      </main>
    );
  }

  userTyping = (inputType, e) => {
    switch (inputType) {
      case "groupName":
        this.setState({ groupName: e.target.value });
        break;

      default:
        break;
    }
  };

  submitNewGroup = async e => {
    e.preventDefault();

    const groupExists = await this.groupExists();
    if (groupExists) {
        this.props.addToExistingGroupFn(this.state.groupName.toUpperCase());
    //   const alreadyInGroup = await this.alreadyInGroup();
    //   alreadyInGroup ? console.log("already in grp") : console.log("Welcome to group");
    } else {
        this.props.createNewChannelFn(this.state.groupName)
        //   this.setState({ serverError: true, overSmart: false });
    }
  };

  createNewChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.groupName,
      message: this.state.message
    });
  };

  goToChat = () =>
    this.props.goToChatFn(this.buildDocKey(), this.state.message);

  buildDocKey = () => {
    return this.state.groupName;
  };

  alreadyInGroup = async () => {
    const docKey = this.buildDocKey();
    const group = await firebase
      .firestore()
      .collection("groups")
      .doc(docKey)
      .get();
    // console.log(chat.exists);
    return group.exists;
  };

  groupExists = async () => {
    const groupSnapshot = await firebase
      .firestore()
      .collection("groups")
      .get();
    const exists = groupSnapshot.docs
      .map(_doc => _doc.data().name.toUpperCase())
      .includes(this.state.groupName.toUpperCase());

    return exists;
  };
}

export default withStyles(styles)(NewGroup);
