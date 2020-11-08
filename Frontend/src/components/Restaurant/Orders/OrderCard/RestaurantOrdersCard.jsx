import React, { Component } from 'react';
import './RestaurantOrdersCard.styles.css'
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import {setOrderID,setCustomerID} from '../../../../reduxConfig/CommonActions'
class RestaurantOrdersCard extends Component {
    state = {
        redirect: false,
        cat: [
            "",
            "Pick Up Ready",
            "Picked Up",
            "On the way",
            "Delivered",
            "In the making",
            "Order Placed",
            "Cancelled"
        ]
    }

    handleClick = () => {
        console.log(this.props);
        this.props.setOrderID({ order_id: this.props.props.res.order_id })
        
        this.props.setCustomerID({ customer_id: this.props.props.res.customer_id })
        this.props.history.push('/restaurant/orderDetails')
    }
    render() {
       
        const restData = { ...this.props.props.res }
        if (restData.order_date !== undefined) {
            restData.order_date = restData.order_date.split('T')[0]
        }

        return (<div>
            {/* {JSON.stringify(this.props.props)} */}
            <div className="restCard">

                <h3>
                    {restData.restaurant_name}
                </h3>
                <h5>
                    Status:{restData.order_status}
                </h5>
                <h5>
                    Time: {restData.order_time}
                </h5>
                <h5>
                    Date:{restData.order_date}
                </h5>
                <h5>
                    Order Price:{restData.order_total_price}
                </h5>

                {/* <Link to={{
                    pathname: 'menu',
                    state: {
                        restaurant_email: this.props.props.res.email,
                        restaurant_id: this.props.props.res.restaurant_id
                    }
                }} component={Menu}><button >Check the Menu</button></Link> */}
                <button className="btn btn-danger col-md-6" onClick={this.handleClick}>Order Details</button>
            </div>
        </div>);
    }
}

// export default RestaurantCard;
//export default withRouter(RestaurantOrdersCard);
const mapStateToProps = (state) => {
    return {
        customer_id: state.customer_id,
        order_id: state.order_id,
        restaurant_id: state.restaurant_id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderID: (order_id) => dispatch(setOrderID(order_id)),

        setCustomerID: (customer_id) => dispatch(setCustomerID(customer_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RestaurantOrdersCard));