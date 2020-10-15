import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from "react-cookies";
class Create extends Component {
  state = {
    BookID: null,
    Title: "",
    Author: "",
    errrormsg: null,
  };
  handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value, errormsg: null });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      BookID: this.state.BookID,
      Title: this.state.Title,
      Author: this.state.Author,
    };

    //console.log(data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:3001/create", data)
      .then((res, err) => {
        //console.log("creating...");
        if (res.status === 200) {
          this.props.history.push("home");
          //console.log("inside 200");
        } else {
          window.alert("Error occured");
        }
      })
      .catch((res, err) => {
        this.setState({
          errormsg: "BookId already exists",
        });
      });
  };
  render() {
    let redirectVar;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        <br />
        {redirectVar}
        <div class="container">
          <form action="http://127.0.0.1:3000/create" method="post">
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="number"
                class="form-control"
                name="BookID"
                required
                placeholder="Book ID"
                onChange={this.handleInput}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="Title"
                required
                placeholder="Book Title"
                onChange={this.handleInput}
              />
            </div>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                type="text"
                class="form-control"
                name="Author"
                required
                placeholder="Book Author"
                onChange={this.handleInput}
              />
            </div>
            <br />
            <div style={{ width: "30%" }}>
              <button
                class="btn btn-success"
                onClick={this.handleSubmit}
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
          <br></br>
          <p>{this.state.errormsg}</p>
        </div>
      </div>
    );
  }
}

export default Create;
