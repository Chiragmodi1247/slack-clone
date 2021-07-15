const styles = theme => ({
  content: {
    height: "calc(100% - 42px)",
    backgroundColor:"#F5F5F5",
    overflow: "auto",
    padding: "5px",
    marginLeft: "80vW",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "42px",
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
  delete: {
    color: "red",
    cursor: "pointer"
  },
  listItem: {
    padding: '5px',
    marginTop: '10px',
    borderRadius: '10px',
    border: '1px solid black',
    color: 'white',
    backgroundColor: '#1a237e'
  },
  todoheader: {
    marginTop: '10px'
  },

  ToDoTextBox: {
    width: "17vW",
  },

  chatHeader: {
    width: "20vW",
    height: "42px",
    backgroundColor: "#303F9F",
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
