module.exports = (app) => {
    app.get('/products/create', async (req, res, next) => {
        return res.status(200).json({ 'api': 'create' });
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

    app.get('/products', async (req, res, next) => {
        return res.status(200).json({ 'api': 'top products' });
    });
}