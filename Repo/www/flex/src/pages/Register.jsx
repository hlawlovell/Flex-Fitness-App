import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Register = () => (
  <div id="logForm">
  <h1>Sign Up</h1>
  <Form>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit" href="/home">
      Register
    </Button>
  </Form>
  </div>
)
export default Register;