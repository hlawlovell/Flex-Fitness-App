import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Login = () => (
  <div id="logForm">
  <h1>flex</h1>
  <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button className="formButton" variant="primary" type="submit" href="/home">
      Login
    </Button>
    <Button className="formButton" variant="primary" type="submit" href="/register">
      register
    </Button>
  </Form>
  </div>
)
export default Login;