import React from "react";
import styles from "./Styles";
import {
  withStyles,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";
import Delete from "@material-ui/icons/Delete";

import firebase from "firebase";

class ToDoView extends React.Component {
  constructor() {
    super();
    this.state = {
      newToDoItem: null,
    };
  }

  render() {
    const { classes, user , ToDoList } = this.props;
    if (user === undefined) {
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
          </main>
        </div>
      );
    } else {
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
            {ToDoList.length ? (
              <List>
                <Typography
                  component="h3"
                  variant="h6"
                  align="center"
                  className={classes.todoheader}
                >
                  To Do List
                </Typography>
                {ToDoList.map((_item, _index) => {
                  return (
                    <div key={_index}>
                      <ListItem className={classes.listItem}>
                        <ListItemText>{_item.item}</ListItemText>
                        <Delete
                          className={classes.delete}
                          onClick={() => this.deleteItem(_item.item)}
                        ></Delete>
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

  // componentDidMount = () => {
  //   setTimeout(this.fetchList, 4000);
  // };

  fetchList = async () => {
    var user = firebase.auth().currentUser;
    if (user) {
      await firebase
        .firestore()
        .collection("todo")
        .where("user", "==", this.props.user)
        .onSnapshot(async res => {
          console.log("Called");
          const ToDoListDoc = res.docs.map(_doc => _doc.data());
          await this.setState({
            ToDoList: ToDoListDoc[0].todolist
          });
          console.log("TODO: ", this.state);
        });
    }
    console.log("User: " + this.props.user);
  };
}

export default withStyles(styles)(ToDoView);
