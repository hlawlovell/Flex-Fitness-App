import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Formik } from 'formik';

const login = (email, password) => {
  axios
  .post('http://localhost:3000/accounts/login', {
    email,
    password,
  })
  .then(function() {
    window.location.href = '/flex';
  });
}

const Login = () => {
  
  return (
    <div id="logForm">
    <h1>flex</h1>

    <Formik
      initialValues={{email: '', password: ''}}
      validate={values => {
        let errors = {};

        if (!values.email) {
          errors.email = "Enter an email address";
        } 

        if (!values.password) {
          errors.password = "Enter a password";
        }   
          return errors
      }}
      onSubmit={values => {
        login(values.email, values.password);
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
          login(email, password);
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
  )}
export default Login;