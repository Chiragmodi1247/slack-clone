import React from "react";
import ChatList from "../chatList/ChatList";
import ChatView from '../chatView/ChatView'

import firebase from "firebase";
import styles from "./Styles";
import { Button, withStyles } from "@material-ui/core";
class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      chats: []
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ChatList
          history={this.props.history}
          newChatBtnFn={this.newChatBtnClick}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          selectedChatIndex={this.state.selectedChat}
        ></ChatList>
        <ChatView></ChatView>
        <Button onClick={this.signOut} className={classes.signOutBtn}>
          SignOut
        </Button>
      </React.Fragment>
    );
  }

  signOut = () => {
    firebase.auth().signOut();
  };

  selectChat = chatIndex => {
    console.log("Chat selected", chatIndex);
  };

  newChatBtnClick = () => {
    this.setState({ newChatFormVisible: true, selectedChat: null });
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _usr => {
      if (!_usr) this.props.history.push("/login");
      else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({
              email: _usr.email,
              chats: chats
            });
            console.log(this.state);
          });
      }
    });
  };
}

export default withStyles(styles)(Dashboard);
