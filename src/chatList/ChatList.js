import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./Styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import AddBox from "@material-ui/icons/AddBox";

class ChatList extends React.Component {
  render() {
    const { classes } = this.props;
    if (this.props.chats.length > 0) {
      return (
        <main className={classes.root}>
            <Typography component="h3" variant="h6" display='inline' align="center" className={classes.title}>
              Direct Messages
            </Typography>
            <AddBox onClick={this.props.newChatBtnFn} className={classes.addBtn}></AddBox>
          <List>
            {this.props.chats.map((_chat, _index) => {
              const colors = ["#D32F2F", "#388E3C", "#FFA000"];
              const number = Math.floor(Math.random() * 3);
              const curr = colors[number];

              return (
                <div key={_index}>
                  <ListItem
                    onClick={() => this.selectChat(_index)}
                    className={
                      this.props.selectedChatIndex === _index
                        ? classes.selectedChat
                        : classes.listItem
                    }
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="remy"
                        style={{
                          backgroundColor: "white",
                          color: curr,
                          fontWeight: "bold",
                        }}
                      >
                        {
                          _chat.users
                            .filter(
                              (_user) => _user !== this.props.userEmail
                            )[0]
                            .split("")[0]
                        }
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        _chat.users.filter(
                          (_user) => _user !== this.props.userEmail
                        )[0]
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" color="textSecondary">
                            {_chat.messages[
                              _chat.messages.length - 1
                            ].message.substring(0, 25)}
                            {_chat.messages[_chat.messages.length - 1].message
                              .length > 25
                              ? "..."
                              : null}
                          </Typography>
                        </React.Fragment>
                      }
                    ></ListItemText>
                    {_chat.receiverHasRead === false &&
                    !this.userIsSender(_chat) ? (
                      <ListItemIcon>
                        <NotificationImportant
                          className={classes.unreadMessage}
                        ></NotificationImportant>
                      </ListItemIcon>
                    ) : null}
                  </ListItem>
                  <Divider></Divider>
                </div>
              );
            })}
          </List>
          <main>
          <Typography component="h3" variant="h6" display='inline' align="center" className={classes.title}>
              Channels
            </Typography>
            <AddBox onClick={this.props.newGrpBtnFn} className={classes.addBtn}></AddBox>

            {this.props.groups.length > 0 ? (
              <List>
                {this.props.groups.map((_group, _index) => {
                  const colors = ["#D32F2F", "#388E3C", "#FFA000"];
                  const number = Math.floor(Math.random() * 3);
                  const curr = colors[number];
                  return (
                    <div key={_index}>
                      <ListItem
                        onClick={() => this.selectGroupChat(_index)}
                        className={
                          this.props.selectedGroupIndex === _index
                            ? classes.selectedChat
                            : classes.listItem
                        }
                        alignItems="flex-start"
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt="remy"
                            style={{
                              backgroundColor: "white",
                              color: curr,
                              fontWeight: "bold",
                            }}
                          >
                            {_group.name.split("")[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={_group.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                color="textSecondary"
                              >
                                {_group.messages.length > 0
                                  ? _group.messages[
                                      _group.messages.length - 1
                                    ].message.substring(0, 25)
                                  : null}
                                {_group.messages.length > 0
                                  ? _group.messages[_group.messages.length - 1]
                                      .message.length > 25
                                    ? "..."
                                    : null
                                  : null}
                              </Typography>
                            </React.Fragment>
                          }
                        ></ListItemText>
                        {/* {_group.receiverHasRead === false &&
                        !this.userIsSender(_group) ? (
                          <ListItemIcon>
                            <NotificationImportant
                              className={classes.unreadMessage}
                            ></NotificationImportant>
                          </ListItemIcon>
                        ) : null} */}
                      </ListItem>
                      <Divider></Divider>
                    </div>
                  );
                })}
              </List>
            ) : null}
          </main>
        </main>
      );
    } else {
      return (
        <main className={classes.root}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            className={classes.newChatBtn}
            onClick={this.props.newChatBtnFn}
          >
            Start a new chat
          </Button>
        </main>
      );
    }
  }
  newChat = () => {
    console.log("New chat");
  };
  selectChat = (chatIndex) => {
    this.props.selectChatFn(chatIndex);
  };
  selectGroupChat = (groupChatIndex) => {
    this.props.selectGroupFn(groupChatIndex);
  };
  userIsSender = (chat) =>
    chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
}

export default withStyles(styles)(ChatList);
