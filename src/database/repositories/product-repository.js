const { ProductModel } = require('../models');
const { ApiError, STATUS_CODES } = require('../../utils/app-errors');

class ProductRepository {

    async CreateProduct({ 
        name,
        desc,
        type,
        unit,
        price,
        available,
        supplier,
        banner
    }) {
        try {
            const product = new ProductModel({
                name,
                desc,
                type,
                unit,
                price,
                available,
                supplier,
                banner
            });

            const productResult = await product.save();
            return productResult;
        } catch (error) {
            throw new ApiError(
                'API Error',
                STATUS_CODES.INTERNAL_ERROR,
                'Unable to create product'
            );
        }
    }

    async Products() {
        try {
            return await ProductModel.find();
        } catch (err) {
            throw new ApiError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Get Products"
            );
        }
    }

    async FindById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Find Product"
            );
        }
    }

    async FindByCategory(category) {
        try {
            const products = await ProductModel.find({ type: category });

            return products;
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Find Products of this Category"
            );
        }
    }

    async FindSelectedProducts(selectedIds) {
        try {
            const products = await ProductModel.find()
                .where('_id')
                .in( selectedIds.map((_id) => _id) )
                .exec();

            return products;
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Find Product"
            );
        }
    }
}

module.exports = ProductRepository;