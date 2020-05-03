const styles = theme => ({
  root: {
    backgroundColor: '#1976D2',
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: '20vW',
    boxShadow: "0px 0px 2px black",
    overflow:"scroll"
  },
  listItem: {
    cursor: "pointer",
    color: 'white',
    "&:hover": {
      backgroundColor: "#303F9F"
    }
  },
  title: {
    margin: '5px',
    color: 'white'
  },
  addBtn: {
    color: "white",
    cursor: "pointer",
    float: 'right',
    margin: '5px',
    "&:hover": {
      color: "wheat"
    }
  },
  selectedChat: {
    cursor: "pointer",
    backgroundColor: "#303F9F",
    color: 'white'
  },
  newChatBtn: {
    borderRadius: "0px",
    backgroundColor: "#303F9F",
    "&:hover": {
      backgroundColor: "#673AB7"
    }
  },
  unreadMessage: {
    color: "red",
    position: "absolute",
    top: "0",
    right: "5px"
  }
});

export default styles;
