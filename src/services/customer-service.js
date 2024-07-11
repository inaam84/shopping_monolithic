const { CustomerRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { ApiError, BadRequestError } = require('../utils/app-errors');

// All Business logic will be here
class CustomerService {

    constructor(){
        this.repository = new CustomerRepository();
    }

    async SignUp(userInputs){
        
        const { email, password, phone } = userInputs;
        
        try{
            // create salt
            let salt = await GenerateSalt();
            
            let userPassword = await GeneratePassword(password, salt);
            
            const existingCustomer = await this.repository.CreateCustomer({ email, password: userPassword, phone, salt});
            
            //const token = await GenerateSignature({ email: email, _id: existingCustomer._id});
            const token = 'HEREISTHETOKEN';

            return FormateData({id: existingCustomer._id, token });

        }catch(err){
            throw new ApiError('Data Not found', err);
        }

    }

}

module.exports = CustomerService;