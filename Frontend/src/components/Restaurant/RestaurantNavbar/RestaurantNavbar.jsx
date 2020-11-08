import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { logout } from "../../../reduxConfig/LoginActions";
import { connect } from "react-redux";
import bgImage from "../../../Assets/BackgroundImages/yelp-1-logo.png";
//create the Navbar Component
class RestaurantNavbar extends Component {
  // constructor(props) {
  //     super(props);
  //     this.handleLogout = this.handleLogout.bind(this);
  // }
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
    cookie.remove("email", { path: "/" });
    cookie.remove("user_type", { path: "/" });
    localStorage.clear()
    this.props.logout();
    this.props.history.push("/");
  };
  render() {
    let redirectVar = null;
    if (cookie.load("cookie") === undefined) {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <div>
        {redirectVar}

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">
            <img
              src={bgImage}
              width="30"
              height="30"
              href="/"
              class="d-inline-block align-top"
              alt=""
            ></img>
          </a>
          <a className="navbar-brand" href="/restaurant/home">
            Yelp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/restaurant/home">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="/restaurant/events/home">
                  Events
                </a>
              </li>
            </ul>

            <a
              className="nav-link"
              style={{ color: "black" }}
              href="/restaurant/orders"
            >
              Your Orders
            </a>
            <a
              className="nav-link"
              style={{ color: "black" }}
              href="/restaurant/messages"
            >
              Support
            </a>
            <a
              className="nav-link"
              style={{ color: "black" }}
              href="/restaurant/profile"
            >
              My Details
            </a>
            <button
              className="nav-link"
              style={{
                backgroundColor: "Transparent",
                border: "none",
                cursor: "pointer",
                overflow: "hidden",
                outline: "none",
              }}
              onClick={this.handleLogout}
            >
              Logout{" "}
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    // counterIncrement: (counter) => dispatch(counterIncrement(counter))
    logout: (loggedIn) => dispatch(logout(loggedIn)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantNavbar);

// export default RestaurantNavbar;
