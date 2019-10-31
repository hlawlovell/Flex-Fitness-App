import React, {Component} from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Formik } from 'formik';
import Cookies from 'js-cookie';




const login = (formData) => {

  var tuser = formData.get('username')
  var tpas = formData.get('password')
  axios({
    method: 'post',
    url:"http://localhost:8000/accounts/login/",
    withCredentials: true,
    data: {
      username:tuser,
      email:"",
      password:tpas
    },
    config:{
      headers:{'Content-Type':'application/json'}
    }
  })
  .then(function(response) {
    Cookies.set('Authorization',response.data.key)
    window.location.href = '/flex';
  });
}

class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

  }
  
    handleSubmit(e) {
      alert('The value is: ' + this.input.value);
      e.preventDefault();
    }
  
    render() {
      return (
<div id="logForm">
    <h1>flex</h1>

    <Formik
      initialValues={{username: '', password: ''}}
      validate={values => {
        let errors = {};

        if (!values.username) {
          errors.username = "Enter an email address";
        } 

        if (!values.password) {
          errors.password = "Enter a password";
        }   
          return errors
      }}
      onSubmit={values => {
        
        var formData = new FormData();
        formData.append('username',values.username);
        formData.append('email',"");
        formData.append('password',values.password);
        login(formData);
      }}
    >
      {({handleSubmit,
        handleChange,
        values,
        touched,
        errors,}) => (
        <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username"
            name="username"
            value={values.username}
            onChange={handleChange}
            isInvalid={touched.username && !!errors.username}
          />
          <Form.Control.Feedback type="invalid">
                  {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            isInvalid={touched.password && !!errors.password}
          />
          <Form.Control.Feedback type="invalid">
                  {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button 
        className="formButton" 
        variant="primary" 
        type="submit"
        onClick={e => {
          //Changed these to values. to get rid of error
          login(values.username, values.password);
        }}>
        Login
      </Button>
      <Button className="formButton" variant="primary" type="submit" href="/register">
        register
      </Button>
      </Form>
      )}
    </Formik>

    </div>
      );
    }
  }

  export default LoginForm;