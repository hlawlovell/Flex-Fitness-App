import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const login = (email, password) => {
  axios
  .post('http://localhost:3000/accounts/login', {
    email,
    password,
  })
  .then();
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div id="logForm">
    <h1>flex</h1>
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email" 
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Button 
        className="formButton" 
        variant="primary" 
        type="submit" 
        href="/flex"
        onClick={e => {
          login(email, password);
        }}>
        Login
      </Button>
      <Button className="formButton" variant="primary" type="submit" href="/register">
        register
      </Button>
    </Form>
    </div>
  )}
export default Login;