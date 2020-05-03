const styles = theme => ({
  content: {
    height: "calc(100vh - 90px)",
    overflow: "auto",
    padding: "5px",
    marginLeft: "20vW",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "42px",
    width: "60vW",
    position: "absolute",
    backgroundColor: '#fafafa'
  },

  userSent: {
    float: "left",
    clear: "both",
    padding: "10px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#e0e0e0",
    width: "300px",
    borderRadius: "10px"
  },
  userSentGrp: {
    float: "left",
    clear: "both",
    paddingLeft: "5px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    fontWeight: "bold"
  },
  userSentGrpMsg: {
    float: "left",
    clear: "both",
    padding: "10px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    backgroundColor: "#e0e0e0",
    width: "300px",
    borderRadius: "10px"
  },
  friendSentGrp: {
    float: "right",
    clear: "both",
    padding: "10px",
    boxSizing: "border-box",
    wordWrap: "break-word"
  },
  friendSentGrpMsg: {
    float: "right",
    clear: "both",
    padding: "10px",
    boxSizing: "border-box",
    marginTop: "10px",
    wordWrap: "break-word",
    backgroundColor: "#303F9F",
    color: "white",
    width: "300px",
    borderRadius: "10px"
  },

  friendSent: {
    float: "right",
    clear: "both",
    padding: "10px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#303F9F",
    color: "white",
    width: "300px",
    borderRadius: "10px"
  },

  chatHeader: {
    width: "60vW",
    height: "42px",
    backgroundColor: "#eeeeee",
    position: "fixed",
    marginLeft: "20vW",
    fontSize: "18px",
    paddingTop: "10px",
    paddingLeft: '20px',
    fontWeight: 'bold',
    boxSizing: "border-box"
  },

  searchMsgBox: {
    float: "right",
    bottom: '5px',
    width: '20vw'
  },

  addBtn: {
    float: "right",
    paddingRight: "5px",
    cursor: "pointer",
    "&:hover": {
      color: "gray"
    }
  }
});

export default styles;
