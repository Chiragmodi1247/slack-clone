import { Link } from "react-router-dom";
import React from "react";
import styles from "./Styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import firebase from "firebase";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signUpError: ""
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline></CssBaseline>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            SignUp!
          </Typography>
          <form onSubmit={e => this.handleSubmit(e)} className={classes.form}>
            <FormControl fullWidth required margin="normal">
              <InputLabel htmlFor="signup-email-input">
                Enter Your Email
              </InputLabel>
              <Input
                autoComplete="email"
                autoFocus
                onChange={e => this.userTyping("email", e)}
                id="signup-email-input"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-input">
                Enter Password
              </InputLabel>
              <Input
                type="password"
                onChange={e => this.userTyping("password", e)}
                id="signup-password-input"
              ></Input>
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation-input">
                Confirm Password
              </InputLabel>
              <Input
                type="password"
                onChange={e => this.userTyping("passwordConfirmation", e)}
                id="signup-password-confirmation-input"
              ></Input>
            </FormControl>
            <Button
              type="submit"
              className={classes.submit}
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
            {this.state.signUpError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.signUpError}
              </Typography>
            ) : null}
            <Typography
              component="h5"
              variant="h6"
              className={classes.hasAccountHeader}
            >
              Already have an account?
              <Link className={classes.logInLink} to="/login">
                Login
              </Link>
            </Typography>
          </form>
        </Paper>
      </main>
    );
  }

formIsValid = () => this.state.password === this.state.passwordConfirmation;

  userTyping = (type, e) => {
    console.log(type, e);
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      case "passwordConfirmation":
        this.setState({
          passwordConfirmation: e.target.value
        });
        break;
    }
  };
  handleSubmit = e => {
      e.preventDefault();

      if(!this.formIsValid()) {
          this.setState({
              signUpError: "Password does not match"
          })
          return
      }
      console.log("Form is Valid: ",this.formIsValid)
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email,this.state.password)
      .then(authres => {
        const userObj = {
            email: authres.user.email
        }
        firebase.firestore()
        .collection('users')
        .doc(this.state.email)
        .set(userObj)
        .then( () => {
            this.props.history.push('/dashboard')
        },dberr => {
            console.log(dberr)
            this.setState({
                signUpError: "Error adding user"
            })
        })
      }, autherr => {
        console.log(autherr)
        this.setState({
            signUpError: "Error adding user"
        })
      })
      
    };
}

export default withStyles(styles)(SignUp);
