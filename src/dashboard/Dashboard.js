import React from "react";
import ChatList from "../chatList/ChatList";
import ChatView from "../chatView/ChatView";
import ChatTextBox from "../chatTextBox/ChatTextBox";
import NewChat from "../newChat/NewChat";
import ToDoView from "../ToDoList/ToDoView";

import firebase from "firebase";
import styles from "./Styles";
import { Button, withStyles } from "@material-ui/core";
class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedChat: 0,
      newChatFormVisible: false,
      email: null,
      chats: [],
      ToDoList: []
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
        {this.state.newChatFormVisible ? null : (
          <ChatView
            user={this.state.email}
            chat={this.state.chats[this.state.selectedChat]}
          ></ChatView>
        )}
        <ToDoView user={this.state.email}></ToDoView>
        {this.state.selectedChat !== null && !this.state.newChatFormVisible ? (
          <ChatTextBox
            messageReadFn={this.messageRead}
            submitMsgFn={this.submitMsg}
          ></ChatTextBox>
        ) : null}
        {this.state.newChatFormVisible ? (
          <NewChat
            goToChatFn={this.goToChat}
            newChatSubmitFn={this.newChatSubmit}
            userEmail={this.state.email}
          ></NewChat>
        ) : null}
        <Button onClick={this.signOut} className={classes.signOutBtn}>
          SignOut
        </Button>
      </React.Fragment>
    );
  }

  signOut = () => {
    firebase.auth().signOut();
  };

  submitMsg = msg => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        _usr => _usr !== this.state.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          message: msg,
          sender: this.state.email,
          timeStamp: Date.now()
        }),
        receiverHasRead: false
      });
  };

  buildDocKey = friend => [this.state.email, friend].sort().join(":");

  selectChat = async chatIndex => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  };

  messageRead = () => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        _usr => _usr !== this.state.email
      )[0]
    );
    if (this.clickedChatWhereNotSender(this.state.selectedChat)) {
      console.log("No sender");
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({
          receiverHasRead: true
        });
    } else {
      console.log("User is sender");
    }
  };

  clickedChatWhereNotSender = chatIndex =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.email;

  newChatBtnClick = () => {
    this.setState({ newChatFormVisible: true, selectedChat: null });
  };

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find(_chat =>
      usersInChat.every(_user => _chat.users.includes(_user))
      );
      this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMsg(msg);
  };

  newChatSubmit = async chatObj => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [this.state.email, chatObj.sendTo],
        messages: [
          {
            message: chatObj.message,
            sender: this.state.email
          }
        ]
      });
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  };
  componentWillMount = () => {
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
          });
      }
    });
  };
}

export default withStyles(styles)(Dashboard);
