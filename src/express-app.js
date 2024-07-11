const express = require('express');
const cors  = require('cors');
const { customer, product, shopping } = require('./api');
const HandleErrors = require('./utils/error-handler')


module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());

    //api
    customer(app);
    product(app);
    shopping(app);

    // error handling
    //app.use(HandleErrors);
    
}