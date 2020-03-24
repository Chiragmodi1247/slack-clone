import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route , BrowserRouter as Router} from 'react-router-dom'

import Login from './login/Login'
import SignUp from './signup/SignUp'
import Dashboard from './dashboard/Dashboard'

import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyA2vvppNKMGcIcn4VlOG0w2D0dX0hKHjC0",
    authDomain: "slack-clone-416df.firebaseapp.com",
    databaseURL: "https://slack-clone-416df.firebaseio.com",
    projectId: "slack-clone-416df",
    storageBucket: "slack-clone-416df.appspot.com",
    messagingSenderId: "511024007430",
    appId: "1:511024007430:web:ab3a876feaaeef8719b687",
    measurementId: "G-RTFHV95F7J"
})

const Routing = (
    <Router>
        <div id='routing-container'>
            <Route path='/login' component={Login}></Route>
            <Route path='/signup' component={SignUp}></Route>
            <Route path='/' exact component={Dashboard}></Route>
        </div>
    </Router>
)

ReactDOM.render(Routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
