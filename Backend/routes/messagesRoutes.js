const express = require("express");
const messageRouter = express.Router();
const messageServices = require("../kafkaservices/messageServices");

const {
    GET_MESSAGES,
    GET_CUSTOMER_MESSAGES_LIST,
    POST_MESSAGES,
    GET_RESTAURANT_MESSAGES_LIST,
    POST_FIRST_MESSAGE,
  
} = require("../config/routeConstants");

messageRouter
  .route(GET_MESSAGES)
  .get(messageServices.getMessages);
messageRouter
.route(GET_CUSTOMER_MESSAGES_LIST)
.get(messageServices.customerMessagelist);
messageRouter
  .route(POST_MESSAGES)
  .post(messageServices.postMessages);
  messageRouter
  .route(GET_RESTAURANT_MESSAGES_LIST)
  .get(messageServices.restaurantMessagelist);
  messageRouter
  .route(POST_FIRST_MESSAGE)
  .post(messageServices.postFirstmessage);



 module.exports = messageRouter;