const styles = theme => ({
    content: {
      height: "calc(100% - 50px)",
      backgroundColor:"#F5F5F5",
      overflow: "auto",
      padding: "5px",
      marginLeft: "80vW",
      boxSizing: "border-box",
      overflowY: "scroll",
      top: "50px",
      width: "20vW",
      position: "absolute"
    },
    closeBtn: {
      float:'right',
      paddingRight:'5px',
      cursor: "pointer",
    },  
    delete: {
      color: "red",
      cursor: "pointer"
    },
    listItem: {
      padding: '5px',
      marginTop: '10px',
      borderRadius: '10px',
      border: '1px solid black'
    },
    todoheader: {
      marginTop: '10px'
    },
  
    searchMemberBox: {
      width: "19vW"
    },
  
    chatHeader: {
      width: "20vW",
      height: "50px",
      backgroundColor: "#616161",
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
  