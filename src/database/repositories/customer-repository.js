const { CustomerModel, AddressModel } = require('../models');
const { ApiError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors');

// Dealing with database operations
class CustomerRepository {
    
    // create customer
    async CreateCustomer({ email, password, phone, salt }) {
        try {
            const customer = new CustomerModel({
                email,
                password,
                salt,
                phone,
                address: []
            });

            const customerResult = await customer.save();
            return customerResult;
        } catch (error) {
            throw new ApiError(
                'API Error',
                STATUS_CODES.INTERNAL_ERROR,
                'Unable to create customer'
            );
        }
    }

    async CreateAddress({ _id, street, postalCode, city, country }) {
        try {
            const profile = await CustomerModel.findById(_id);

            if(profile) {
                const newAddress = new AddressModel({
                    street,
                    postalCode,
                    city,
                    country
                });

                await newAddress.save();

                profile.address.push(newAddress);
            } else {
                throw new ApiError(
                    'API Error',
                    STATUS_CODES.NOT_FOUND,
                    'Customer not found'
                );    
            }

            return await profile.save();
        } catch (error) {
            throw new ApiError(
                'API Error',
                STATUS_CODES.INTERNAL_ERROR,
                'Unable to create address'
            );
        }
    }

    async FindCustomer({ email }) {
        try {
            const existingCustomer = await CustomerModel.findOne({ email: email });
            return existingCustomer;
        } catch (error) {
            throw new ApiError(
                'API Error',
                STATUS_CODES.NOT_FOUND,
                'Unable to find customer'
            );
        }
    }

    async FindCustomerById({ id }) {
        try {
            const existingCustomer = await CustomerModel.findById(id)
                .populate('address')
                .populate('wishlist')
                .populate('orders')
                .populate('cart.product');
            return existingCustomer;
        } catch (error) {
            throw new ApiError(
                'API Error',
                STATUS_CODES.NOT_FOUND,
                'Unable to find customer'
            );
        }
    }

    async Wishlist(customerId) {
        try {
            const profile = await CustomerModel.findById(customerId).populate('wishlist');

            return profile.wishlist;
        } catch (error) {
            throw new ApiError(
                'API Error',
                STATUS_CODES.NOT_FOUND,
                'Unable to find customer'
            );
        }
    }

    async AddWishlistItem(customerId, product) {
        try {
            const profile = await CustomerModel.findById(customerId).populate('wishlist');

            if(profile){
                let wishlist = profile.wishlist;

                if(wishlist.length > 0) {
                    let isExist = false;

                    wishlist.map((item) => {
                        if(item._id.toString() === product._id.toString()) {
                            const index = wishlist.indexOf(item);
                            wishlist.splice(index, 1);
                            isExist = true;
                        }
                    });

                    if(!isExist) {
                        wishlist.push(product);
                    } 
                } else {
                    wishlist.push(product);
                }

                profile.wishlist = wishlist;
            } else {
                throw new ApiError(
                    'API Error',
                    STATUS_CODES.NOT_FOUND,
                    'Customer not found'
                );    
            }

            const profileResult = await profile.save();

            return profileResult.wishlist;
        } catch (error) {
            throw new ApiError(
                'API Error',
                STATUS_CODES.NOT_FOUND,
                'Unable to add to wishlist'
            );
        }
    }

    async AddCartItem(customerId, product, qty, isRemove) {
        try {
            const profile = await CustomerModel.findById(customerId).populate('cart.product');

            if(profile){
                const cartItem = {
                    product,
                    unit: qty
                };

                let cartItems = profile.cart;

                if(cartItems.length > 0) {
                    let isExist = false;

                    cartItems.map((item) => {
                        if(item._id.toString() === product._id.toString()) {
                            if(isRemove) {
                                cartItems.splice(cartItems.indexOf(item), 1);
                            } else {
                                item.unit = qty;
                            }
                            isExist = true;
                        }
                    });

                    if(!isExist) {
                        cartItems.push(cartItem);
                    }
                } else {
                    cartItems.push(cartItem);
                }

                profile.cart = cartItems;
            } else {
                throw new ApiError(
                    'API Error',
                    STATUS_CODES.NOT_FOUND,
                    'Customer not found'
                );    
            }

            const cartSaveResult = await profile.save();

            return cartSaveResult.cart;
        } catch (error) {
            throw new ApiError(
                'API Error',
                STATUS_CODES.NOT_FOUND,
                'Unable to add to wishlist'
            );
        }
    }

    async AddOrderToProfile(customerId, order) {
        try {
            const profile = await CustomerModel.findById(customerId);
            
            if (profile) {
                if (profile.orders == undefined) {
                    profile.orders = [];
                }
                
                profile.orders.push(order);
                
                profile.cart = [];
                
                const profileResult = await profile.save();
                
                return profileResult;
            }
            
            throw new Error("Unable to add to order!");
        } catch (err) {
            throw new APIError(
                "API Error",
                STATUS_CODES.INTERNAL_ERROR,
                "Unable to Create Customer"
            );
        }
    }
}

module.exports = CustomerRepository;