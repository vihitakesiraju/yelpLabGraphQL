import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";

class Delete extends Component {
  state = {
    BookID: null,
    errormsg: null,
  };
  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      BookID: e.target.value,
      errormsg: null,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      BookID: this.state.BookID,
    };
    Axios.defaults.withCredentials = true;

    Axios.post("http://localhost:3001/delete", data)
      .then((res, error) => {
        if (res.status === 200) {
          this.props.history.push("/home");
        } else {
          window.alert("Deletion not possible");
        }
      })
      .catch((res) => {
        this.setState({
          errormsg: "ID doesnot exist....Deletion not possible!!",
        });
      });
  };
  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
      //this.props.history.push("login");
    }
    return (
      <div class="container">
        {redirectVar}
        <form>
          <div style={{ width: "50%", float: "left" }} class="form-group">
            <input
              type="text"
              class="form-control"
              name="BookID"
              required
              placeholder="Search a Book by Book ID"
              onChange={this.handleInput}
            />
          </div>
          <div style={{ width: "50%", float: "right" }}>
            <button
              class="btn btn-success"
              onClick={this.handleSubmit}
              type="submit"
            >
              Delete
            </button>
          </div>
          <p>{this.state.errormsg}</p>
        </form>
      </div>
    );
  }
}

export default Delete;
