const styles = theme => ({

    content: {
      height: 'calc(100vh - 100px)',
      overflow: 'auto',
      padding: '5px',
      marginLeft: '20vW',
      boxSizing: 'border-box',
      overflowY: 'scroll',
      top: '50px',
      width: '60vW',
      position: 'absolute'
    },
  
    userSent: {
      float: 'left',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '10px',
      backgroundColor: '#707BC4',
      color: 'white',
      width: '300px',
      borderRadius: '10px'
    },
  
    friendSent: {
      float: 'right',
      clear: 'both',
      padding: '20px',
      boxSizing: 'border-box',
      wordWrap: 'break-word',
      marginTop: '10px',
      backgroundColor: '#707BC4',
      color: 'white',
      width: '300px',
      borderRadius: '10px'
    },
  
    chatHeader: {
      width: '60vW',
      height: '50px',
      backgroundColor: '#344195',
      position: 'fixed',
      marginLeft: '20vW',
      fontSize: '18px',
      textAlign: 'center',
      color: 'white',
      paddingTop: '10px',
      boxSizing: 'border-box'
    }
  
  });
  
  export default styles;