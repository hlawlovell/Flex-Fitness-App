import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
//import App from './components/app/App';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import './index.css';

ReactDOM.render(
  <Router>
    <Landing path="/" />
    <Login path="/login" />
    <Home path="/home" />
  </Router>,
  document.getElementById('root')
);
