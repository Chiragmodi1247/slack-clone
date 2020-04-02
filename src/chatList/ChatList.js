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

class ChatList extends React.Component {
  render() {
    const { classes } = this.props;
    if (this.props.chats.length > 0) {
      return (
        <main className={classes.root}>
          <Typography component="h3" variant="h6" align="center">
            Direct Messages
          </Typography>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            className={classes.newChatBtn}
            onClick={this.props.newChatBtnFn}
          >
            Start a new chat
          </Button>
          <List>
            {this.props.chats.map((_chat, _index) => {
              return (
                <div key={_index}>
                  <ListItem
                    onClick={() => this.selectChat(_index)}
                    className={classes.listItem}
                    selected={this.props.selectedChatIndex === _index}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar alt="remy">
                        {
                          _chat.users
                            .filter(_user => _user !== this.props.userEmail)[0]
                            .split("")[0]
                        }
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        _chat.users.filter(
                          _user => _user !== this.props.userEmail
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
            <Typography
              style={{ backgroundColor: "red", color: "white" }}
              component="h3"
              variant="h6"
              align="center"
            >
              Channels
            </Typography>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              className={classes.newChatBtn}
              onClick={this.props.newGrpBtnFn}
            >
              Create/Join a Channel
            </Button>

            {this.props.groups.length > 0 ? (
              <List>
                {this.props.groups.map((_group, _index) => {
                  return (
                    <div key={_index}>
                      <ListItem
                        onClick={() => this.selectGroupChat(_index)}
                        className={classes.listItem}
                        selected={this.props.selectedGroupIndex === _index}
                        alignItems="flex-start"
                      >
                        <ListItemAvatar>
                          <Avatar alt="remy">{_group.name.split("")[0]}</Avatar>
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
  selectChat = chatIndex => {
    this.props.selectChatFn(chatIndex);
  };
  selectGroupChat = groupChatIndex => {
    this.props.selectGroupFn(groupChatIndex);
  };
  userIsSender = chat =>
    chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
}

export default withStyles(styles)(ChatList);
