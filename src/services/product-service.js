const { ProductRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, ValidatePassword, GenerateToken } = require('../utils');
const { ApiError, BadRequestError } = require('../utils/app-errors');
const logger = require('../utils/logger');

// All Business logic will be here
class ProductService {

    constructor(){
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs) {
        try{
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData(productResult);
        }catch(err){
            if (err instanceof ApiError) {

                throw err;
            }
            logger.error('Error during creating product: %s', err.message, { stack: err.stack });
            throw new ApiError('Error during creating product', err.message);
        }
    }

    async GetProducts(){
        try{
            const products = await this.repository.Products();
    
            let categories = {};
    
            products.map(({ type }) => {
                categories[type] = type;
            });
            
            return FormateData({
                products,
                categories:  Object.keys(categories) ,
            })

        } catch(err) {
            if (err instanceof ApiError) {

                throw err;
            }
            logger.error('Error during getting products: %s', err.message, { stack: err.stack });
            throw new ApiError('Error during getting products', err.message);
        }
    }
}

module.exports = ProductService;