import React from "react";
import ChatList from "../chatList/ChatList";
import ChatView from "../chatView/ChatView";
import ChatTextBox from "../chatTextBox/ChatTextBox";
import NewChat from "../newChat/NewChat";
import ToDoView from "../ToDoList/ToDoView";
import NewGroup from "../newGroup/NewGroup";
import MembersList from "../groupMembers/MembersList";

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
      ToDoList: [],
      groups: [],
      selectedGroupIndex: null,
      isChat: true,
      newGroupFormVisible: false,
      addUserForm: false,
      groupIndexToAddUser: null,
      showMembers: false,
      MembersList: null
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
          groups={this.state.groups}
          selectedGroupIndex={this.state.selectedGroupIndex}
          selectGroupFn={this.selectGroupChat}
          newGrpBtnFn={this.newGrpBtnClick}
        ></ChatList>
        {this.state.newChatFormVisible ? null : (
          <ChatView
            user={this.state.email}
            chat={this.state.chats[this.state.selectedChat]}
            groupChat={this.state.groups[this.state.selectedGroupIndex]}
            isChat={this.state.isChat}
            addUserFn={this.addUserBtnClick}
            fetchMemberListFn={this.fetchMemberList}
          ></ChatView>
        )}
        {this.state.showMembers ? (
          <MembersList
          MembersList={this.state.MembersList}
          closeListFn={this.closeMemberList}
          user={this.state.email}
          ></MembersList>
        ) : (
          <ToDoView
            user={this.state.email}
            ToDoList={this.state.ToDoList}
          ></ToDoView>
        )}
        {(this.state.selectedChat !== null ||
          this.state.selectedGroupIndex !== null) &&
        !this.state.newChatFormVisible ? (
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
            addingUser={false}
          ></NewChat>
        ) : null}
        {this.state.newGroupFormVisible ? (
          <NewGroup
            createNewChannelFn={this.createNewChannel}
            userEmail={this.state.email}
          ></NewGroup>
        ) : null}
        {this.state.addUserForm ? (
          <NewChat
            addNewUserFn={this.addNewUserInChannel}
            userEmail={this.state.email}
            addingUser={true}
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
    if (this.state.isChat) {
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
    } else {
      console.log("Group send");
      const docKey = this.state.groups[
        this.state.selectedGroupIndex
      ].name.toUpperCase();
      console.log("Doc:", docKey);
      firebase
        .firestore()
        .collection("groups")
        .doc(docKey)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            message: msg,
            sender: this.state.email,
            timeStamp: Date.now()
          })
        });
    }
  };

  addNewUserInChannel = async userName => {
    console.log(
      "adding him:",
      userName,
      "in",
      this.state.groups[this.state.groupIndexToAddUser].name
    );
    const docKey = this.state.groups[
      this.state.groupIndexToAddUser
    ].name.toUpperCase();
    await firebase
      .firestore()
      .collection("groups")
      .doc(docKey)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(userName)
      });

    this.setState({
      newChatFormVisible: false,
      addUserForm: false,
      newGroupFormVisible: false
    });
    this.selectGroupChat(this.state.groupIndexToAddUser);
  };

  createNewChannel = async groupName => {
    console.log("Creating new group: ", groupName);
    const docKey = groupName.toUpperCase();
    await firebase
      .firestore()
      .collection("groups")
      .doc(docKey)
      .set({
        users: [this.state.email],
        name: groupName,
        messages: []
      });
    this.setState({ newGroupFormVisible: false });
    const newGroup = this.state.groups.find(
      _group => _group.name === groupName
    );
    this.selectGroupChat(this.state.groups.indexOf(newGroup));
  };

  buildDocKey = friend => [this.state.email, friend].sort().join(":");

  selectChat = async chatIndex => {
    await this.setState({
      selectedChat: chatIndex,
      selectedGroupIndex: null,
      newChatFormVisible: false,
      isChat: true,
      addUserForm: false,
      newGroupFormVisible: false,
      showMembers: false
    });
    this.messageRead();
  };

  selectGroupChat = async groupIndex => {
    await this.setState({
      selectedGroupIndex: groupIndex,
      selectedChat: null,
      newChatFormVisible: false,
      isChat: false,
      addUserForm: false,
      newGroupFormVisible: false,
      showMembers: false
    });
    // this.messageRead();
  };

  messageRead = () => {
    if (this.state.isChat) {
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
    }
  };

  clickedChatWhereNotSender = chatIndex =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.email;

  newChatBtnClick = () => {
    this.setState({
      newChatFormVisible: true,
      selectedChat: null,
      addUserForm: false,
      newGroupFormVisible: false
    });
  };

  newGrpBtnClick = () => {
    console.log("New grp");
    this.setState({
      newGroupFormVisible: true,
      addUserForm: false,
      selectedChat: null,
      selectedGroupIndex: null,
      newChatFormVisible: false
    });
  };

  addUserBtnClick = () => {
    console.log("Adding user");
    this.setState({
      newGroupFormVisible: false,
      addUserForm: true,
      selectedChat: null,
      groupIndexToAddUser: this.state.selectedGroupIndex,
      selectedGroupIndex: null
    });
  };

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find(_chat =>
      usersInChat.every(_user => _chat.users.includes(_user))
    );
    this.setState({
      newChatFormVisible: false,
      addUserForm: false,
      newGroupFormVisible: false
    });
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
    this.setState({
      newChatFormVisible: false,
      addUserForm: false,
      newGroupFormVisible: false
    });
    this.selectChat(this.state.chats.length - 1);
  };

  fetchMemberList = async () => {
    await this.setState({
      MembersList: this.state.groups[this.state.selectedGroupIndex].users,
      showMembers: true
    })
    console.log("Fetched members::",this.state.MembersList)
  }

  closeMemberList = () => {
    this.setState({showMembers: false})
  }

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
        await firebase
          .firestore()
          .collection("groups")
          .where("users", "array-contains", _usr.email)
          .onSnapshot(async res => {
            const groups = res.docs.map(_doc => _doc.data());
            await this.setState({
              groups: groups
            });
          });
        await firebase
          .firestore()
          .collection("todo")
          .where("user", "==", _usr.email)
          .onSnapshot(async res => {
            console.log("Called");
            const ToDoListDoc = res.docs.map(_doc => _doc.data());
            await this.setState({
              ToDoList: ToDoListDoc[0].todolist
            });
            console.log("TODO: ", this.state);
          });
      }
    });
  };
}

export default withStyles(styles)(Dashboard);
