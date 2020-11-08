import React, { Component } from 'react';
import axios from 'axios'
import routeConstants from '../../../Config/routeConstants'
import { connect } from 'react-redux'
import { setConversationID } from '../../../reduxConfig/CommonActions'
import MessageCard from './MessageCard/MessageCard';
class MessagesListCustomer extends Component {
    state = {
        resData: []
    }
    componentDidMount() {
        //axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        console.log("restuarant id")
        console.log(this.props.restaurant_id)
        axios.get(`${routeConstants.BACKEND_URL}/messages${routeConstants.GET_CUSTOMER_MESSAGES_LIST}`, {
            params: {
                
                customer_id: this.props.customer_id,
            }
        }).then((res) => {
            this.setState({ resData: [...res.data] })
            console.log(res);
        }).catch((err) => {
            console.log("Cannot Load Conversations" + err)
        })
    }
    render() {
        let renderVar;
        if (this.state.resData.length > 0) {
            renderVar = this.state.resData.map((res, i) => {
                return <MessageCard data={res} key={i} />
            })
        }
        return (
            <div>
                {renderVar}
            </div>
        );
    }
}

// export default MessagesList;
const mapStateToProps = (state) => {
    return {
        
        customer_id: state.customer_id,
        //jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setConversationID: (conversation_id) => dispatch(setConversationID(conversation_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesListCustomer); 