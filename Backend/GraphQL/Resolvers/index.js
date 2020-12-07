const LoginResolver = require('./Login');
const RestaurantResolver=require('./Restaurant')

const rootResolver = {
...LoginResolver,
...RestaurantResolver
};

module.exports = rootResolver;