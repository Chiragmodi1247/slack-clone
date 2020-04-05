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

class MembersList extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
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
      let filteredMembersList = MembersList.filter(
          (member) => {
            return member.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1;
          }
        )
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
            {filteredMembersList.length ? (
              <List>
                {filteredMembersList.map((_item, _index) => {
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
                          <CloseIcon className={classes.delete} onClick={ () => this.props.removeMemberFn(_item)}></CloseIcon>
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
      this.setState({ searchTerm: e.target.value });
  };

}

export default withStyles(styles)(MembersList);
