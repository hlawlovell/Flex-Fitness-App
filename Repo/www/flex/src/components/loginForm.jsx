import React, {Component} from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      alert('The value is: ' + this.input.value);
      e.preventDefault();
    }
  
    render() {
      return (
          <Form onSubmit={this.handleSubmit}>
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
      );
    }
  }

  export default LoginForm;