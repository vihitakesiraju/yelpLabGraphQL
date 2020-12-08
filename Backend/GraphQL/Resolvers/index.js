const LoginResolver = require('./Login');
const RestaurantResolver=require('./Restaurant')
const CustomerResolver=require('./Customer')
const rootResolver = {
...LoginResolver,
...RestaurantResolver,
...CustomerResolver
};

module.exports = rootResolver;