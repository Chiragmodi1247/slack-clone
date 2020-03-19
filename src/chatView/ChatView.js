import React from 'react'
import styles from './Styles'
import { withStyles } from '@material-ui/core'

class ChatView extends React.Component {
render() {
    const { classes } = this.props;
    return(
        <div className={classes.content}>Hello fron ChatView</div>
    )
}
}

export default withStyles(styles)(ChatView)