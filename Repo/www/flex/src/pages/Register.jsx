import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Formik } from 'formik';
import Cookies from 'js-cookie';

const RegisterInfo = (username, password1, password2) => {
  console.log(password1)
  axios({
    method: 'post',
    url:"http://localhost:8001/signup/",
    withCredentials: true,
    data: {
      username:username,
      password1:password1,
      password2:password2
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

const Register = () => {

  return (
    <div id="logForm">
    <h1>Sign Up</h1>
    <Formik
      initialValues={{username: '', password1: '', password2: ''}}
      validate={values => {
        let errors = {};

        // validate email
        if (!values.username) {
          errors.username = "Enter a username";
        }
        
        // validate password
        if (!values.password1) {
            errors.password1 = "Enter a password";
        } else if (values.password1.length < 6) {
          errors.password1 = "Password must be longer than 6 characters";
        } else if (values.password1 !== values.password2) {
          errors.password2 = "Password does not match";
        }  
        return errors
      }}
      onSubmit={values => {
        RegisterInfo(values.username, values.password1, values.password2);
      }}
      
    >
      {({handleSubmit,
        handleChange,
        values,
        touched,
        errors,}) => (
        <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
                  {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password1"
            placeholder="Password"
            value={values.password1}
            onChange={handleChange}
            isInvalid={touched.password1 && !!errors.password1}
          />
          <Form.Control.Feedback type="invalid">
                  {errors.password1}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password"
            name="password2" 
            placeholder="Confirm" 
            value={values.password2}
            onChange={handleChange}
            isInvalid={touched.password2 && !!errors.password2}
          />
          <Form.Control.Feedback type="invalid">
                  {errors.password2}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit"
        >
          Register
        </Button>
      </Form>
      )}
    </Formik>
    </div>
)}
export default Register;