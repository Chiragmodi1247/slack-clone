import { Link } from "react-router-dom";
import React from "react";
import styles from "./Styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import firebase from "firebase";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: false
    };
  }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={e => this.handleSubmit(e)} className={classes.form}>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="login-email-input">
                Enter your email
              </InputLabel>
              <Input
                onChange={e => this.userTyping("email", e)}
                autoFocus
                autoComplete="email"
                id="login-email-input"
              ></Input>
            </FormControl>
            <FormControl fullWidth required margin="normal">
              <InputLabel htmlFor="login-password-input">Password</InputLabel>
              <Input
                onChange={e => this.userTyping("password", e)}
                type="password"
                id="login-password-input"
              ></Input>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
          </form>
          {this.state.loginError ? (
            <Typography
              component="h5"
              variant="h6"
              className={classes.errorText}
            >
              Incorrect credentials
            </Typography>
          ) : null}
          <Typography>
            Don't have an account?{" "}
            <Link to="/signup" className={classes.signUpLink}>
              Create one
            </Link>
          </Typography>

          <br />
          <br />

          <div className={classes.testDiv}>
          <Typography className={classes.testDivText}>
            Are you a recruiter? Just want to test the site?
          </Typography>
          <Button
              variant="contained"
              color="primary"
              className={classes.test}
              onClick={this.testTheSite}
            >
              Yes
            </Button>
          </div>
        </Paper>
      </main>
    );
  }
  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;

      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };

  testTheSite = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword('test@slack.com', 'test123')
      .then(
        () => {
          this.props.history.push("/");
        },
        err => {
          this.setState({ loginError: true });
        }
      );
  }

  handleSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push("/");
        },
        err => {
          this.setState({ loginError: true });
        }
      );
  };
}

export default withStyles(styles)(Login);
