const ProductService = require('../services/product-service');
const CustomerService = require('../services/customer-service');
const { BadRequestError } = require('../utils/app-errors');
const logger = require('../utils/logger');
const UserAuth = require("./middlewares/auth");


module.exports = (app) => {
    const service = new ProductService();
    const customerService = new CustomerService();

    app.post('/products/create', async (req, res, next) => {
        try {
            const { name, desc, type, unit,price, available, supplier, banner } = req.body; 
            // validation
            const { data } =  await service.CreateProduct({ name, desc, type, unit,price, available, supplier, banner });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
    });

    app.get('/products/category/:type', async (req, res, next) => {
        return res.status(200).json({ 'api': 'product search by category' });
    });

    app.get('/products/:id', async (req, res, next) => {
        return res.status(200).json({ 'api': 'products search by id' });
    });

    app.get('/products/ids', async (req, res, next) => {
        return res.status(200).json({ 'api': 'products collection' });
    });

    app.get('/products/wishlist', async (req, res, next) => {
        return res.status(200).json({ 'api': 'products wishlist' });
    });

    app.get('/products', UserAuth, async (req, res, next) => {
        //check validation
        try {
            const { data} = await service.GetProducts();        
            return res.status(200).json(data);
        } catch (error) {
            next(err)
        }
    });
}