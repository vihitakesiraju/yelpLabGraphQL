const con = require("../config/dbConnection");
const {
  CONTENT_TYPE,
  APP_JSON,
  RES_SUCCESS,
  RES_BAD_REQUEST,
  RES_NOT_FOUND,
  RES_DUPLICATE_RESOURCE,
  TEXT_PLAIN,
  RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");

const multer = require("multer");

const customer_data=require('../models/customer_data');
const login_credentials = require('../models/');

module.exports.getAllCustomers = (req, res) => {
 console.log("Inside Customer GET All service");
};
module.exports.getCustomer = (req, res) => {
 console.log("Inside Customer GET service");
   console.log("req params" + JSON.stringify(req.query));
 
 };
 module.exports.createCustomer = (req, res) => {
   console.log("Inside Customer Create POST service");
   console.log("req body" + JSON.stringify(req.body));

   let logindetails=new login_credentials({
    email_id: req.body.EMAIL,
    user_password: req.body.PASSWORD,
    user_type: 1
})
logindetails.save().then((res)=>{
    console.log("insidelogindetails")
    let id=mongoose.Types.ObjectId()
    let customerdetails=new customer_data({
    customer_id: id,
    customer_name: msg.body.NAME,
    email_id: msg.body.EMAIL,
    birthday:msg.body.BIRTHDAY,
    contact_number:msg.body.PHONE,
    about:msg.body.ABOUT,
    things_loved:msg.body.THINGS_LOVED,
    find_me:msg.body.FIND_ME,
    blog_ref:msg.body.BLOG_REF,
    }
)
console.log("customerdetails"+customerdetails)
customerdetails.save().then((res)=>{
  res.status(RES_SUCCESS).send(JSON.stringify(response));
}).catch(err=>{
login_credentials.findOneAndDelete({email_id:req.body.EMAIL}).then(
  res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err))
)
})
}).catch(err=>{
    login_credentials.findOneAndDelete({email_id:req.body.EMAIL}).then(
      res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err))
    )
})
 };

 module.exports.updateCustomerProfile = (req, res) => {
      console.log("Inside Customer Update Profile service");
   console.log("req body" + JSON.stringify(req.body));

   let cust_update={
    customer_name: req.body.NAME,
    birthday:req.body.BIRTHDAY,
    contact_number:req.body.PHONE,
    about:req.body.ABOUT,
    things_loved:req.body.THINGS_LOVED,
    find_me:req.body.FIND_ME,
    blog_ref:req.body.BLOG_REF,

 }
 customer.findByIdAndUpdate({customer_id:req.body.customer_id},customer,(err,result)=>{
    if(err){
        callback(err,'Error')
        }
        else{
            callback(null,result)
        }
 })

}

