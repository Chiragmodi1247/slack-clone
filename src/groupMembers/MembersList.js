import React from "react";
import styles from "./Styles";
import {
  withStyles,
  TextField,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import firebase from "firebase";

class MembersList extends React.Component {
  constructor() {
    super();
    this.state = {
      newToDoItem: null
    };
  }

  render() {
    const { classes, MembersList } = this.props;
    if (MembersList === undefined) {
      return (
        <div className={classes.chatHeader}>
          Members
          <CloseIcon></CloseIcon>
        </div>
      );
    } else {
      return (
        <div>
          <div className={classes.chatHeader}>
            Members
            <CloseIcon
              onClick={this.props.closeListFn}
              className={classes.closeBtn}
            ></CloseIcon>
          </div>
          <main className={classes.content}>
            <TextField
              className={classes.searchMemberBox}
              placeholder="Search member..."
              onKeyUp={e => this.userTyping(e)}
              id="newToDoTextBox"
            ></TextField>
            {MembersList.length ? (
              <List>
                {MembersList.map((_item, _index) => {
                  return (
                    <div key={_index}>
                      <ListItem className={classes.listItem}>
                        <ListItemText>
                          {_item}
                          <span style={{ color: "blue" }}>
                            {this.props.user === _item ? "(You)" : null}
                          </span>
                        </ListItemText>
                        {this.props.user === _item ? null : (
                          <CloseIcon className={classes.delete}></CloseIcon>
                        )}
                      </ListItem>
                    </div>
                  );
                })}
              </List>
            ) : null}
          </main>
        </div>
      );
    }
  }

  userTyping = e => {
    e.keyCode === 13
      ? this.addItem()
      : this.setState({ newToDoItem: e.target.value });
  };

  msgValid = txt => txt && txt.replace(/\s/g, "").length;

  addItem = () => {
    if (this.msgValid(this.state.newToDoItem)) {
      document.getElementById("newToDoTextBox").value = "";

      firebase
        .firestore()
        .collection("todo")
        .doc(this.props.user)
        .update({
          todolist: firebase.firestore.FieldValue.arrayUnion({
            item: this.state.newToDoItem
          })
        });

      console.log("Submit");
    }
  };
  deleteItem = _item => {
    firebase
      .firestore()
      .collection("todo")
      .doc(this.props.user)
      .update({
        todolist: firebase.firestore.FieldValue.arrayRemove({
          item: _item
        })
      });
  };
}

export default withStyles(styles)(MembersList);
