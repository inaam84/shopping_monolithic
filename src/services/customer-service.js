const { CustomerRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, ValidatePassword, GenerateToken } = require('../utils');
const { ApiError, BadRequestError } = require('../utils/app-errors');
const logger = require('../utils/logger');

// All Business logic will be here
class CustomerService {

    constructor(){
        this.repository = new CustomerRepository();
    }

    async SignUp(userInputs){
        
        const { email, password, phone } = userInputs;
        
        try{
            // check if user exists
            const existingCustomer = await this.repository.FindCustomer({ email });
            if(existingCustomer) {
                throw new BadRequestError('User already exists');
            }

            // create user
            let salt = await GenerateSalt();
            
            let hashedPassword = await GeneratePassword(password, salt);
            
            const newCustomer = await this.repository.CreateCustomer({ email, password: hashedPassword, phone, salt});
            console.log(newCustomer);
            const token = await GenerateToken( newCustomer );

            return FormateData({ id: newCustomer._id, token });

        } catch(err) {
            if (err instanceof ApiError) {

                throw err;
            }
            logger.error('Error during sign up: %s', err.message, { stack: err.stack });
            throw new ApiError('Error during sign up', err.message);
        }

    }
    
    async SignIn(userInputs){
        
        const { email, password } = userInputs;
        
        try{
            // check if user exists
            const existingCustomer = await this.repository.FindCustomer({ email });
            if(!existingCustomer) {
                throw new BadRequestError('Invalid email or password');
            }

            const isMatch = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
            if(!isMatch) {
                throw new BadRequestError('Invalid email or password');
            }

            // Generate Token
            const token = GenerateToken(existingCustomer);

            return FormateData({id: existingCustomer._id, token });            
        } catch(err) {
            if (err instanceof ApiError) {
                throw err;
            }
            logger.error('Error during sign up: %s', err.message, { stack: err.stack });
            throw new ApiError('Error during sign in', err.message);
        }

    }

    async AddNewAddress(_id, userInputs) {
        const { street, postalCode, city, country } = userInputs;

        try {
            const addressResult = await this.repository.CreateAddress( _id, { street, postalCode, city, country });

            return FormateData(addressResult);
        } catch (err) {
            logger.error('Error during adding address: %s', err.message, { stack: err.stack });
            throw new ApiError('Error during adding address', err.message);
        }
    }

    async GetProfile(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById({id});
            return FormateData(existingCustomer);
            
        } catch (err) {
            throw new ApiError('Data Not found', err)
        }
    }
    
    async GetShopingDetails(id){

        try {
            const existingCustomer = await this.repository.FindCustomerById({id});
            return FormateData(existingCustomer);
            
        } catch (err) {
            throw new ApiError('Data Not found', err)
        }
    }

    async GetWishList(customerId){

        try {
            const wishListItems = await this.repository.Wishlist(customerId);
            return FormateData(wishListItems);
        } catch (err) {
            throw new APIError('Data Not found', err)           
        }
    }
}

module.exports = CustomerService;