const CustomerService = require('../services/customer-service');


module.exports = (app) => {

    const service = new CustomerService();

    app.post('/customer/signup', async (req, res, next) => {
        try {

            const { email, password, phone } = req.body;

            const { data } = await service.SignUp({ email, password, phone });

            return res.json(data);            
        } catch (error) {
            next(error);
        }
    });

    app.get('/customer/login', async (req, res, next) => {
        return res.status(200).json({ 'api': 'login' });
    });

    app.get('/customer/address', async (req, res, next) => {
        return res.status(200).json({ 'api': 'address' });
    });

    app.get('/customer/profile', async (req, res, next) => {
        return res.status(200).json({ 'api': 'profile' });
    });

    app.get('/customer/shopping-details', async (req, res, next) => {
        return res.status(200).json({ 'api': 'shopping-details' });
    });

    app.get('/customer/wishlist', async (req, res, next) => {
        return res.status(200).json({ 'api': 'wishlist' });
    });
}