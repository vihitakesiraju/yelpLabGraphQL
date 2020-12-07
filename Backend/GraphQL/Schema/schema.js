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
      dish_name: String
      image_url: String
      ingredients: String
      price: String
      category_id: String
    }
  
    type Dishes {
    
      restaurant_id: String
    
    }

type RootQuery {
  getLogin(Login_id: ID!): [Login]!
}

type RootMutation {
userLogin(userlogininput: UserLogin!): Login!
createDish(createdishinput: Dish): Dishes
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);






