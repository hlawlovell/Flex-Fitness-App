import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "@reach/router"
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Workout from "./pages/Workout";
import Profile from "./pages/Profile";
import './index.css';

ReactDOM.render(
  <Router>
    <Landing path="/" />
    <Login path="/login" />
    <Home path="/home" />
    <Workout path="/workout" />
    <Profile path="/profile" />
  </Router>,
  document.getElementById('root')
);

