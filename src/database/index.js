// database related modules
module.exports = {
    databaseConnection: require('./connection'),
    CustomerRepository: require('./repositories/customer-repository'),
    ProductRepository: require('./repositories/product-repository'),
};