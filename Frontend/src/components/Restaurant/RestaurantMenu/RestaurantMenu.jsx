import React, { Component } from "react";
import axios from "axios";
import constants from "../../../Config/routeConstants";
import cookie from "react-cookies";
import RestaurantMenuCard from "./RestaurantMenuCard/RestaurantMenuCard";
import "./RestaurantMenu.styles.css";
import menuIcon from "../../../Assets/BackgroundImages/menu_icon.jpg";
import {connect} from 'react-redux'
class RestaurantMenu extends Component {
  state = {
    res: [],
  };
  componentDidMount() {
    // console.log("card loaded")

    // console.log(this.props)
    axios
      .get(
        `${constants.BACKEND_URL}/restaurant/${constants.GET_RESTAURANT_MENU}`,
        {
          params: {
            // email: "Gustavo_Monk@example.com"
            restaruant_id:this.props.restaurant_id
          },
        }
      )
      .then((res) => {
        console.log("Test data");
        this.setState({ res: res.data});
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert("Failed to load menu");
      });
  }
  render() {
    let dishes;
    let desserts = [];
    let salads = [];
    let beverages = [];
    let appetizers = [];
    let mains = [];
    if (this.state.res.length > 0) {
      dishes = this.state.res.map((dish) => {
        switch (dish.category_id) {
          case "1": {
            desserts.push(<RestaurantMenuCard menuItem={dish} />);
            break;
          }
          case "2": {
            salads.push(<RestaurantMenuCard menuItem={dish} />);
            break;
          }
          case "3": {
            beverages.push(<RestaurantMenuCard menuItem={dish} />);
            break;
          }
          case "4": {
            appetizers.push(<RestaurantMenuCard menuItem={dish} />);
            break;
          }
          case "5": {
            mains.push(<RestaurantMenuCard menuItem={dish} />);
            break;
          }
          default: {
          }
        }
      });
    } else {
      dishes = <h3>Unable to fetch menu.</h3>;
    }
    return (
      <div class="image">
        <div className="menuPage">
          <div className="menuList">
            <div className="menuListFlex2">
              <div className="menuList12">{appetizers}</div>
              <div className="menuList12">{salads}</div>
              <div className="menuList12">{mains}</div>
              <div className="menuList12">{desserts}</div>

              <div className="menuList12">{beverages}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//export default RestaurantMenu;
const mapStateToProps = (state) => {
  return {
      restaurant_id: state.restaurant_id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenu);