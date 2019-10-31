import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Formik } from 'formik';

const RegisterInfo = (email, password) => {
  axios
  .post('http://localhost:3000/accounts/signup', {
    email,
    password,
  })
  .then(function() {
    window.location.href = '/login';
  });
}

const Register = () => {

  return (
    <div id="logForm">
    <h1>Sign Up</h1>
    <Formik
      initialValues={{email: '', password1: '', password2: ''}}
      validate={values => {
        let errors = {};

        // validate email
        if (!values.email) {
          errors.email = "Enter an email address";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
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
        RegisterInfo(values.email, values.password);
      }}
      
    >
      {({handleSubmit,
        handleChange,
        values,
        touched,
        isValid,
        errors,}) => (
        <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={touched.email && !!errors.email}
          />
          <Form.Control.Feedback type="invalid">
                  {errors.email}
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