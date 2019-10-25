import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "@reach/router"
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flex from "./pages/Flex";
import Workout from "./pages/Workout";
import Profile from "./pages/Profile";

ReactDOM.render(
  <Router>
    <Login path="/" />
    <Login path="/login" />
    <Register path="/register" />
    <Flex path="/flex" />
    <Workout path="/workout" />
    <Profile path="/profile" />
  </Router>,
  document.getElementById('root')
);

