//require("dotenv").config({ path: __dirname + "/.env" });
require("dotenv").config();
let routeConstants = require("./config/routeConstants");
var express = require("express");
var app = express();
//const schema = require('./schema/schema');
const {graphqlHTTP} = require('express-graphql');
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const connecttodb = require("./dbConnections/mongoose");
var cors = require("cors");
app.set("view engine", "ejs");
const path = require("path");
//et mongo = require('..//config/config')
const graphqlSchema = require('../Backend/GraphQL/Schema/schema');
const graphqlResolver = require('../Backend/GraphQL/Resolvers/index');


var passport = require('passport');
var jwt = require('jwt-simple');
app.use(passport.initialize());
app.use(cors({ origin: `${routeConstants.FRONTEND_URL}`, credentials: true }));
// const formidable = require('express-formidable');
// app.use(formidable());

//app.use("/imageData", express.static(path.join(__dirname, "imageData")));

app.use(express.static(path.join(__dirname, 'imageData')));
connecttodb;
// const customerRoutes = require("./routes/customerRoutes");
// const loginRoutes = require("./routes/loginRoute");
// const restaurantRoutes = require("./routes/restaurantRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const eventRoutes = require("./routes/eventRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");
// const imageRoutes = require("./routes/imageRoutes");
//const messagesRoutes = require("./routes/messagesRoutes");

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

//Allow Access Control
 app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// app.use("/", loginRoutes);
// app.use("/customer", customerRoutes);
// app.use("/restaurant", restaurantRoutes);
// app.use("/orders", orderRoutes);
// app.use("/reviews", reviewRoutes);
// app.use("/images", imageRoutes);

// app.use("/events", eventRoutes);
//app.use("/messages",messagesRoutes)
app.use('/graphql', (req, res) => {
  return graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    context: { req, res },
  })(req, res)
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
