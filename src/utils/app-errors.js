const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

class ApiError extends Error {
    constructor(message, details) {
        super(message);
        this.details = details;
        this.name = this.constructor.name;
    }
}

// 400 
class BadRequestError extends ApiError {
    constructor(message, details) {
        super(message || 'Bad Request', details);
        this.statusCode = STATUS_CODES.BAD_REQUEST;
    }
}

// 400 
class ValidationError extends ApiError {
    constructor(message, details) {
        super(message || 'Validation Error', details);
        this.statusCode = STATUS_CODES.BAD_REQUEST;
    }
}

module.exports = {
    ApiError,
    BadRequestError,
    ValidationError,
    STATUS_CODES
};

