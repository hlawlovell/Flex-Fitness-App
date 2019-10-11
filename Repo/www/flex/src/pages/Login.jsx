import React from "react";
import {Helmet} from "react-helmet";
import "../components/login.css";


const Login = () => (
  <div>
    {/*Handles head elements*/}
    <Helmet>
      <title>Flex</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
      <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    </Helmet>

    {/*Page Content*/}
    <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Flex</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address"   />
              </div>

              <div class="form-label-group">
                <input type="password" id="inputPassword" class="form-control" placeholder="Password"  />
              </div>

              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
              <hr class="my-4" />
            </form>
            <a href="#">Register</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
)
export default Login;