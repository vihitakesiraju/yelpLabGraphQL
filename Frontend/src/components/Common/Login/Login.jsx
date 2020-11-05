import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import RouteConstants, { POST_LOGIN } from "../../../Config/routeConstants";
import store from "../../../reduxConfig/store";
import { connect } from "react-redux";
import {
  // emailHandler,
  // passwordHandler,
  // authFlagHandler,
  login,
} from "../../../reduxConfig/LoginActions";
import loginImage from "../../../Assets/BackgroundImages/yelp-1-logo.png";
import "./Login.styles.css";
//Define a Login Component
class Login extends Component {
  state = {
    username: "",
    password: "",
    authFlag: false,
    loginStatus: "",
  };

  componentWillMount() {
    console.log(store);
    this.setState({
      authFlag: false,
    });
  }
  inputChangeHandler = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    console.log(e.target);
  };

  emailChangeHandler = (e) => {
    this.props.emailHandler(e.target.value);
  };

  passwordChangeHandler = (e) => {
    this.props.passwordHandler(e.target.value);
  };
  authFlagChangeHandler = (e) => {
    this.props.authFlagHandler(true);
  };

  //submit Login handler to send a request to the node backend
  // submitLogin = (e) => {
  //     var headers = new Headers();
  //     console.log(this.state);
  //     //prevent page from refresh
  //     e.preventDefault();
  //     const data = {
  //         username: this.state.username,
  //         password: this.state.password
  //     }
  //     let user_type;
  //     //set the with credentials to true
  //     axios.defaults.withCredentials = true;
  //     //make a post request with the user data
  //     axios.post(`${RouteConstants.BACKEND_URL}${POST_LOGIN}`, data)
  //         .then(response => {
  //             console.log("Status Code : ", response.status);
  //             if (response.status === 200) {
  //                 console.log(response.data);
  //                 user_type = response.data.user_type;
  //                 this.setState({
  //                     authFlag: true
  //                 }, () => {
  //                     cookie.save("email", response.data.email_id, {
  //                         path: '/'
  //                     });
  //                     console.log("Updated state");
  //                     if (user_type === "1") {
  //                         console.log("cust redirect");
  //                         cookie.save('cookie');
  //                         this.props.history.push('/customer/home');
  //                     }
  //                     else if (user_type === "2") {
  //                         console.log("rest redirect");
  //                         cookie.save('cookie');
  //                         this.props.history.push('/restaurant/home');
  //                     }
  //                 })

  //             } else {
  //                 this.setState({
  //                     authFlag: false
  //                 })
  //             }
  //         }).catch((err) => {
  //             console.log(err);
  //             this.setState({
  //                 loginStatus: "Login Failed"
  //             });
  //             //window.alert("Login Failed");
  //         });
  // }

  submitLogin = (e) => {
    // var headers = new Headers();
    console.log(this.state);
    //prevent page from refresh
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    let user_type;
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(`${RouteConstants.BACKEND_URL}${POST_LOGIN}`, data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data);
          user_type = response.data.user_type;
          this.setState(
            {
              authFlag: true,
            },
            () => {
              cookie.save("email", response.data.email_id, {
                path: "/",
              });
              cookie.save("user_type", response.data.user_type, {
                path: "/",
              });
              console.log("Updated state");
              console.log(this.state.username)
              if (response.data.user_type === 1) {
                console.log("cust redirect");
                cookie.save("cookie");
                this.props.login({
                  customer_id: response.data._id,
                  user_type: response.data.user_type
                });
                this.props.history.push("/customer/home");
              } else if (response.data.user_type === 2) {
                console.log("rest redirect");
                cookie.save("cookie");
                this.props.login({
                  restaurant_id: response.data._id,
                  user_type: response.data.user_type
                });
                console.log(this.props)
                this.props.history.push("/restaurant/home");
              }
              else{
                console.log("else part for user_type"+response.data.user_type)
              }
            }
          );
        } else {
          this.setState({
            authFlag: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loginStatus: "Login Failed",
        });
        //window.alert("Login Failed");
      });
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    if (this.props.loggedIn) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div class="container h-100">
        <div class="d-flex justify-content-center h-100">
          <div class="user_card">
            <div class="d-flex justify-content-center">
              <div class="brand_logo_container">
                <img src={loginImage} class="brand_logo" alt="Logo"></img>
              </div>
            </div>
            <div class="d-flex justify-content-center form_container">
              <form>
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    onChange={this.inputChangeHandler}
                    required
                    class="form-control input_user"
                    placeholder="username"
                  ></input>
                </div>
                <div class="input-group mb-2">
                  <div class="input-group-append">
                    <span class="input-group-text">
                      <i class="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    onChange={this.inputChangeHandler}
                    required
                    type="password"
                    name="password"
                    class="form-control input_pass"
                    placeholder="password"
                  ></input>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customControlInline"
                    ></input>
                    <label
                      class="custom-control-label"
                      for="customControlInline"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div class="d-flex justify-content-center mt-3 login_container">
                  <button
                    onClick={this.submitLogin}
                    type="button"
                    name="button"
                    class="btn login_btn"
                  >
                    Login
                  </button>
                </div>
              </form>
              {this.state.loginStatus}
            </div>

            <div class="mt-4">
              <div class="d-flex justify-content-center links">
                Don't have an account?{" "}
                <a href="#" class="ml-2">
                  Sign Up
                </a>
              </div>
              <div class="d-flex justify-content-center links">
                <a href="#">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // email_id: state.loginReducer.login.email_id,
    // password: state.loginReducer.login.password,
    // authFlag: state.loginReducer.login.authFlag,
    // loggedIn: state.loginReducer.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // counterIncrement: (counter) => dispatch(counterIncrement(counter))
    // emailHandler: (email_id) => dispatch(emailHandler(email_id)),
    // passwordHandler: (password) => dispatch(passwordHandler(password)),
    // authFlagHandler: (authFlag) => dispatch(authFlagHandler(authFlag)),
    login: (loggedIn) => dispatch(login(loggedIn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);