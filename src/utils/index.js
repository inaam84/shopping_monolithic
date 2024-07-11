const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { APP_SECRET } = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async(password, salt) => {
    return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async(
    givenPassword,
    savedPassword,
    salt
) => {
    return (await this.GeneratePassword(givenPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async(req) => {
    try {
        const signature = req.get('Authorization');

        console.log(signature);

        const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);

        req.user = payload;

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports.FormateData = (data) => {
    if(data) {
        return { data };
    } else {
        throw new Error('Data not found!');
    }
};

