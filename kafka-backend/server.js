var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
const connecttodb = require('./config/mongoose');


var login_credentials=require('./services/loginServices');
var customer_data=require('./services/customerServices');
var restaurant=require('./services/restaurantServices');
var events=require('./services/eventServices');
var reviews=require('./services/reviewServices');
var orders=require('./services/orderServices');
var images=require('./services/imageServices')
var messages=require('./services/messageServices')

connecttodb;

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_book",Books)
//handleTopicRequest("post_book",Books)
handleTopicRequest("post_login",login_credentials)
handleTopicRequest("customer_data",customer_data)
handleTopicRequest("restaurant_data",restaurant)
handleTopicRequest("image_data",images)
handleTopicRequest("event_data",events)
handleTopicRequest("order_data",orders)
handleTopicRequest("review_data",reviews)
handleTopicRequest("message_data",messages)