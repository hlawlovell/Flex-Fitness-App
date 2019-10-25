import React, {useState} from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


const RegisterInfo = (email, password1, password2) => {
  
  // return error statements
  if (password1 === "" || password2 === "") {

  } else if (password1 !== password2) {

  } /*else if (invalid email format) {

  } */

  // send post request
  axios
  .post('http://localhost:3000/accounts/signup', {
    email,
    password1,
  })
  .then();
}

const Register = () => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <div id="logForm">
    <h1>Sign Up</h1>
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
            setPassword1(e.target.value);
          }} 
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          onChange={e => {
            setPassword2(e.target.value);
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" href="/flex"
        onClick={() => {
          RegisterInfo(email, password1, password2)
        }}
      >
        Register
      </Button>
    </Form>
    </div>
)}
export default Register;