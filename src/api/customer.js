const CustomerService = require('../services/customer-service');
const { BadRequestError } = require('../utils/app-errors');
const logger = require('../utils/logger');
const UserAuth = require("./middlewares/auth");

module.exports = (app) => {

    const service = new CustomerService();

    app.post('/customer/signup', async (req, res, next) => {
        const { email, password, phone } = req.body;

        try {
            
            const result = await service.SignUp({ email, password, phone });

            return res.json(result);
        } catch (err) {
            if (err instanceof BadRequestError) {
                res.status(err.statusCode).json({ message: err.message });
            } else {
                logger.error('Internal server error during signup: %s', err.message, { stack: err.stack });
                res.status(500).json({ message: 'Internal server error', details: err.message });
            }
        }
    });

    app.get('/customer/signin', async (req, res, next) => {
        const { email, password } = req.body;

        try {
            
            const { result } = await service.SignIn({ email, password });

            return res.status(201).json({ message: 'User signed in successfully', token: result.token, id: result.id });
        } catch (err) {
            if (err instanceof BadRequestError) {
                res.status(err.statusCode).json({ message: err.message });
            } else {
                logger.error('Internal server error during signup: %s', err.message, { stack: err.stack });
                res.status(500).json({ message: 'Internal server error', details: err.message });
            }
        }
    });

    app.post('/customer/address', UserAuth, async (req, res, next) => {
        try {
            
            const _id = req.user.id;

            const { street, postalCode, city, country } = req.body;

            const { data } = await service.AddNewAddress(_id, {
                street,
                postalCode,
                city,
                country
            });

            return res.json(data);
        } catch (error) {
            next(error);
        }
    });

    app.get("/customer/profile", UserAuth, async (req, res, next) => {
        try {
            const _id = req.user.id;
            const { data } = await service.GetProfile( _id );
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    app.get("/customer/shopping-details", UserAuth, async (req, res, next) => {
        try {
            const _id = req.user.id;
            const { data } = await service.GetShopingDetails( _id );
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });

    app.get('/customer/wishlist', UserAuth, async (req, res, next) => {
        try {
            const _id = req.user.id;
            const { data } = await service.GetWishList( _id );
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });
}