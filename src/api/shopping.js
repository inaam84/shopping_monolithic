module.exports = (app) => {
    app.get('/shopping/order', async (req, res, next) => {
        return res.status(200).json({ 'api': 'shopping order' });
    });

    app.get('/shopping/orders', async (req, res, next) => {
        return res.status(200).json({ 'api': 'shopping orders' });
    });

    app.get('/shopping/cart', async (req, res, next) => {
        return res.status(200).json({ 'api': 'shopping cart' });
    });

}