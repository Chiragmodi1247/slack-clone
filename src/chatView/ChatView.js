import React from "react";
import styles from "./Styles";
import { withStyles } from "@material-ui/core";

class ChatView extends React.Component {
  componentDidUpdate = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };

  render() {
    const { classes, chat, user, groupChat, isChat } = this.props;
    if (groupChat !== undefined && !isChat) {
      return (
        <div>
          <div className={classes.chatHeader}>{groupChat.name}</div>
          <main id="chatview-container" className={classes.content}>
            {groupChat.messages.map((_msg, _index) => {
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
}

export default withStyles(styles)(ChatView);
