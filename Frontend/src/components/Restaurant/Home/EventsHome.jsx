import React, { Component } from "react";
import "./RestaurantHome.styles.css";
import jumborest from "../../../Assets/BackgroundImages/rest_jumbo.jpg";
class EventsHome extends Component {
  state = {};
  render() {
    return (
      <div class="image_rest_home">
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <a
                class="navbar-brand"
                style={{ color: "white" }}
                href="/restaurant/events/create"
              >
                Create Event!!
              </a>
              <a
                class="navbar-brand"
                style={{ color: "white" }}
                href="/restaurant/events/update"
              >
                Update Event!!
              </a>
              <a
                class="navbar-brand"
                style={{ color: "white" }}
                href="/restaurant/events/list"
              >
                Display Events!!
              </a>
              <a
                class="navbar-brand"
                style={{ color: "white" }}
                href="/restaurant/events/list"
              >
                Check Registered!!
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default EventsHome;
