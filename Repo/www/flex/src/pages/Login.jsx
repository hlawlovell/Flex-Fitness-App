import React from "react"
import LoginForm from '../components/loginForm'



const Login = () => {
  var cookies = document.cookie.split(";");

  document.cookie = 'sessionid' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'csrftoken' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

  return (
    <div className="wrapper">
      <LoginForm />
    </div>
    
  )}
export default Login;