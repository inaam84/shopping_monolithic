const { ValidateSignature } = require('../../utils');
const { STATUS_CODES } = require('../../utils/app-errors');

module.exports = async (req, res, next) => {
    
    const isAuthorized = await ValidateSignature(req);

    if(isAuthorized) {
        return next();
    }

    return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Not Authorized' });
};