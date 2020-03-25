const styles = theme => ({
  content: {
    height: "calc(100vh - 100px)",
    overflow: "auto",
    padding: "5px",
    marginLeft: "80vW",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "50px",
    width: "20vW",
    position: "absolute"
  },
  addBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray"
    }
  },

  form: {
    width: "100%",
    marginTop: theme.spacing()
  },
  listItem: {
    cursor: "pointer"
  },

  ToDoTextBox: {
    width: "17vW"
  },

  chatHeader: {
    width: "20vW",
    height: "50px",
    backgroundColor: "#8BC34A",
    position: "fixed",
    marginLeft: "80vW",
    fontSize: "18px",
    textAlign: "center",
    color: "white",
    paddingTop: "10px",
    boxSizing: "border-box"
  }
});

export default styles;
