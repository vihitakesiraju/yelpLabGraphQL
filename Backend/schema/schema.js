const graphql = require('graphql');
const login_credentials = require('../models/login_credentials');
const { login } = require('../services/loginServices');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLDate
} = graphql;
Dishes=require('../models/dishes_data')
Customers=require('../models/customer_data')
Restaurants=require('../models/restaurant_data')
Orders=require('../models/orders_data')
DeliveryAddress=require('../models/delivery_address')
Carts=require('../models/cart_data')
Menus=require('../models/menus_data')

const LoginType = new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
        id: {type: GraphQLID},
        email_id: { type: GraphQLString },
        user_password: { type: GraphQLString },
        user_type: { type: GraphQLString },
       
    })
});

const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
        restaurant_id: { type: GraphQLID },
        restaurant_name: { type: GraphQLString },
        restaurant_location: {type: GraphQLString},
        restaurant_description: {type: GraphQLString},
        restaurant_address: {type: GraphQLString},
        address_city: {type: GraphQLString},
        address_state: {type: GraphQLString},
        address_postal_code: {type: GraphQLString},
        address_latitude: {type: GraphQLInt},
        address_longitude: {type: GraphQLInt},
        primary_phone: {type: GraphQLString},
        secondary_phone: {type: GraphQLString},
        email: {type: GraphQLString},
        open_time: {type: GraphQLString},
        close_time: {type: GraphQLString},
        stars_avg: {type: GraphQLString},
        is_open: {type: GraphQLInt},
        profile_image_link: {type: GraphQLString},
        dishes: {
                type: dishesType,
                resolve(parent, args) {
                return Dishes.find(dish => dish.restaurant_id === parent.restaurant_id);
                }
                }
})
})

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        customer_id: { type: GraphQLID },
        customer_name: { type: GraphQLString },
        birthday: {type: GraphQLDate},
        contact_number: {type: GraphQLInt},
        email_id: {type: GraphQLString},
        about: {type: GraphQLString},
        yelping_since: {type: GraphQLInt},
        signup_date: {type: GraphQLDate},
        profile_image_link: {type: GraphQLString},
        things_loved: {type: GraphQLString },
        find_me: {type: GraphQLString },
        blog_ref: {type: GraphQLString },
})
})


const OrdersType = new GraphQLObjectType({
    name: 'Orders',
    fields: () => ({
        order_id: { type: GraphQLID },
        customer_id: { type: GraphQLID },
        restaurant_id: { type: GraphQLID },
        order_type: {type: GraphQLString },
        order_status: { type: GraphQLString },
        order_date: { type: GraphQLDate },
        order_time: { type: GraphQLString },
        order_total_price: { type: GraphQLInt },
        payment_card_digits: { type: GraphQLInt },
        delivery_address: {
            type: deliverType,
            resolve(parent, args) {
            return DeliveryAddress.find(deliveryaddress => deliveryaddress.id === parent.order_id);
            }
        },
        cart_items: [{
            type: CartType,
            resolve(parent, args) {
            return Carts.find(carts => carts.id === parent.order_id);
            }
        }]
})
})


const DeliveryType = new GraphQLObjectType({
    name: 'DeliveryAddress',
    fields: () => ({
        id:{
            type: GraphQLID,
        },
        delivery_address: {
            type: GraphQLString,
        },
        address_city: {
            type: GraphQLString,
        },
        address_state: {
            type: GraphQLString,
        },
        address_postal_code: {
            type: GraphQLInt,

        },
        address_latitude: {
            type: GraphQLInt,
        },
        address_longitude: {
            type: GraphQLInt,

        },
        primary_phone: {
            type: GraphQLInt,

        },
})
})

const CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({


        dish_id: {
            type: GraphQLID,

        },
        count: {
            type: GraphQLInt,

        },
    
})
})


const MenuType = new GraphQLObjectType({
    name: 'Menus',
    fields: () => ({
        menu_id: {
            type: GraphQLID, },
        restaurant_id: {
            type: GraphQLID,
 
        },
})
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
     fields: {
         login: {
            type: LoginType,
              args: { id: { type: GraphQLID } },
             resolve(parent, args) {
                return login_credentials.find(login => login.id === args.id);
         }
        },
        // author: {
        //     type: AuthorType,
        //     args: { id: { type: GraphQLID } },
        //     resolve(parent, args) {
        //         return authors.find(author => author.id === args.id );
        //     }
        // },
        // books: {
        //     type: new GraphQLList(BookType),
        //     resolve(parent, args) {
        //         return books;
        //     }
        // },
        // authors: {
        //     type: new GraphQLList(AuthorType),
        //     resolve(parent, args) {
        //         return authors;
        //     }
        // }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
     fields: {
    //     addAuthor: {
    //         type: AuthorType,
    //         args: {
    //             name: { type: GraphQLString },
    //             age: { type: GraphQLInt },
    //             id: { type: GraphQLID }
    //         },
    //         resolve(parent, args) {
    //             let author = {
    //                 name: args.name,
    //                 age: args.age,
    //                 id: args.id
    //             };
    //             authors.push(author)
    //             console.log("Authors", authors);
    //             return author;
    //         }
    //     },

    //     addBook: {
    //         type: BookType,
    //         args: {
    //             name: { type: GraphQLString },
    //             genre: { type: GraphQLString },
    //             authorId: { type: GraphQLID },
    //         },
    //         resolve(parent, args) {
    //             let book = {
    //                 name: args.name,
    //                 genre: args.genre,
    //                 authorId: args.authorId,
    //                 id: books.length+1
    //             }
    //             books.push(book);
    //             return book;
    //         }
    //     }

     }
});



const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = schema;

