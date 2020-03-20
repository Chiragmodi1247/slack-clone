import React from "react";
import styles from "./Styles";
import Send from "@material-ui/icons/Send";
import { withStyles, TextField } from "@material-ui/core";

class ChatTextBox extends React.Component {
  constructor() {
    super();
    this.state = {
      chatText: ""
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.chatTextBoxContainer}>
        <TextField
          className={classes.chatTextBox}
          placeholder="Type message..."
          onKeyUp={e => this.userTyping(e)}
          id="chattextbox"
          onFocus={this.userClickedInput}
        ></TextField>
        <Send onClick={this.sendMessage} className={classes.sendBtn}></Send>
      </div>
    );
  }
  userTyping = e => {
    e.keyCode === 13
      ? this.sendMessage()
      : this.setState({ chatText: e.target.value });
    console.log("User typing");
  };
  msgValid = txt => txt && txt.replace(/\s/g, "").length;

  sendMessage = () => {
      if(this.msgValid(this.state.chatText)){
            document.getElementById("chattextbox").value = ''
            this.props.submitMsgFn(this.state.chatText);
              console.log("Submit");
      }
  };
  userClickedInput = () => {
    console.log("Clicked input");
  };
}

export default withStyles(styles)(ChatTextBox);
