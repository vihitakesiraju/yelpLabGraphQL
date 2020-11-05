import React, { Component } from "react";
//import { Link } from "react-router-dom";
//import cookie from "react-cookies";
//import { Redirect } from "react-router";
import bgImage from "../../../Assets/BackgroundImages/yelp-1-logo.png";
// import { login, logout } from '../../../reduxConfig/LoginActions'
// import { connect } from 'react-redux';

//create the Navbar Component
class CommonNavbar extends Component {
  // constructor(props) {
  //     super(props);
  //     this.handleLogout = this.handleLogout.bind(this);
  // }

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#"></a>

          <a class="navbar-brand" href="/">
            <img
              src={bgImage}
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            ></img>
          </a>
          <a class="navbar-brand" href="/">
            Yelp
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>

              <li class="nav-item active">
                <a class="nav-link" href="/restaurant/events/all">
                  Events
                </a>
              </li>
              <li class="nav-item active dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Sign Up
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/customer/signup">
                    Customer
                  </a>
                  <a class="dropdown-item" href="/restaurant/signup">
                    Restaurant
                  </a>
                </div>
              </li>
              {/* <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li> */}
            </ul>

            {/* <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}

            <a class="new-link" style={{ color: "black" }} href="/">
              Help<span class="sr-only">(current)</span>
            </a>
            <a class="nav-link" style={{ color: "black" }} href="/login">
              Login <span class="sr-only">(current)</span>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//     return {
//         loggedIn: state.loginReducer.loggedIn,

//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // counterIncrement: (counter) => dispatch(counterIncrement(counter))
//         login: (loggedIn) => dispatch(login(loggedIn)),
//         logout: (loggedIn) => dispatch(logout(loggedIn)),

//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CommonNavbar);

export default CommonNavbar;
