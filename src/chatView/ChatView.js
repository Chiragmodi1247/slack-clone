import React from "react";
import styles from "./Styles";
import { withStyles, TextField } from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";

class ChatView extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ""
    };
  }

  componentDidUpdate = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };

  render() {
    const { classes, chat, user, groupChat, isChat } = this.props;
    if (groupChat !== undefined && !isChat) {
      let filteredGroupChat = groupChat.messages.filter(chat => {
        return (
          chat.message
            .toLowerCase()
            .indexOf(this.state.searchTerm.toLowerCase()) !== -1
        );
      });
      return (
        <div>
          <div className={classes.chatHeader}>
            <span
              style={{ cursor: "pointer" }}
              onClick={this.props.fetchMemberListFn}
            >
              {groupChat.name.toUpperCase()}
            </span>
            <AddBox onClick={this.addUser} className={classes.addBtn}></AddBox>
          </div>
          <main id="chatview-container" className={classes.content}>
          <TextField
              className={classes.searchMsgBox}
              placeholder="Search Message..."
              onKeyUp={e => this.userTyping(e)}
              id="newToDoTextBox"
            ></TextField>
            {filteredGroupChat.map((_msg, _index) => {
              return (
                <div key={_index}>
                  {_msg.sender === user ? null : (
                    <div className={classes.userSentGrp}>{_msg.sender}</div>
                  )}
                  <div
                    className={
                      _msg.sender === user
                        ? classes.friendSentGrpMsg
                        : classes.userSentGrpMsg
                    }
                  >
                    {_msg.message}
                  </div>
                </div>
              );
            })}
          </main>
        </div>
      );
    } else if (chat !== undefined && isChat) {
      return (
        <div>
          <div className={classes.chatHeader}>
            Your conversation with {chat.users.filter(_usr => _usr !== user)[0]}
          </div>
          <main id="chatview-container" className={classes.content}>
            {chat.messages.map((_msg, _index) => {
              return (
                <div
                  key={_index}
                  className={
                    _msg.sender === user ? classes.friendSent : classes.userSent
                  }
                >
                  {_msg.message}
                </div>
              );
            })}
          </main>
        </div>
      );
    } else {
      return <main id="chatview-container" className={classes.content}></main>;
    }
  }

  addUser = () => {
    this.props.addUserFn();
  };

  userTyping = e => {
    this.setState({ searchTerm: e.target.value });
  };
}

export default withStyles(styles)(ChatView);
