import React from "react";
import styles from "./Styles";
import {
  withStyles,
  TextField,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";

import firebase from "firebase";

class ToDoView extends React.Component {
  constructor() {
    super();
    this.state = {
      newToDoItem: null
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.chatHeader}>Things To DO!</div>
        <main className={classes.content}>
          <TextField
            className={classes.ToDoTextBox}
            placeholder="eg: Buy milk..."
            onKeyUp={e => this.userTyping(e)}
            id="newToDoTextBox"
          ></TextField>
          <AddBox onClick={this.addItem} className={classes.addBtn}></AddBox>
          <List>
            {this.props.ToDoList.map((_item, _index) => {
              return (
                <div key={_index}>
                  <ListItem className={classes.listItem}>
                    <ListItemText>
                      {_item.item}
                    </ListItemText>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </main>
      </div>
    );
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
}

export default withStyles(styles)(ToDoView);
