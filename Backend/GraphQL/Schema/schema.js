const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Login {
     _id: String!
     email_id: String!
    user_password: String!
    user_type: Int!
    user_id: String!
}


input UserLogin {
  email_id: String!
     user_password: String!
}
input Dish {
      description: String
      dish_name: String!
      image_url: String
      ingredients: String!
      price: String!
      category_id: String!
      restaurant_id: String!
    }

input Delivery {
order_id: String!
order_status_id: String!
}

type Deliveries {
  order_id: String!
  order_status: String!

}

input Customer{ 
  customer_id: Int!
  customer_name: String
  birthday: String
  contact_number: String
  blog_ref: String
  things_loved: String
  find_me: String
  about: String
  yelping_since: String


}
type Customers{
  customer_name: String!
  birthday: String
  contact_number: Int
  blog_ref: String
  things_loved: String
  find_me: String
  about: String
  yelping_since: Int
}

type Restaurants{
  restaurant_name: String!
  restaurant_description: String
  review_count: Int
  email: String!
  address_city: String!
  restaurant_address: String

}
input Orders {
  cart_items: [String]
  order_type: String
  order_total_price: Int
  customer_id: String!
  restaurant_id: String1
  payment_card: Int
  delivery_address: String
  address_city: String
  address_postal_code: Int
  address_latitude: Int
  address_longitude: Int
  primary_phone: Int!
}

type Order {
  delivery_address: String
  address_city: String!
  address_postal_code: Int
  address_latitude: Int!
  address_longitude: Int!
  primary_phone: Int!
  payment_card_digits: Int
  cart_items: String
  customer_id: String
  restaurant_id: String
  order_type: String
  order_status: String
  order_total_price: Int
}
  
    type Dishes {
    
      description: String
      dish_name: String!
      image_url: String
      ingredients: String
      price: String!
      category_id: String
  
    
    }

type RootQuery {
  getCustomer(customer_email: String!): Customers!
  getRestaurants(search_string: String!): [Restaurants]!
  getRestaurantOrders(restaurant_id: String!): [Order]!
}

type RootMutation {
userLogin(userlogininput: UserLogin!): Login!
createDish(createdishinput: Dish!): Dishes!
postCustomer(postcustomerinput: Customer!): Customers!
postOrder(postorderinput: Orders!): Order!
updateDelivery(updatedeliveryinput: Delivery!): Deliveries!

}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);






