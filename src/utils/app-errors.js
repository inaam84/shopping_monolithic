const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

class AppError extends Error {
    constructor(
        name,
        statuCode,
        description,
        isOperational,
        errorStack,
        logingErrorResponse
    ) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statuCode = statuCode;
        this.description = description;
        this.isOperational = isOperational;
        this.errorStack = errorStack;
        this.logingErrorResponse = logingErrorResponse;
    }
}

// API specifc errors
class ApiError extends AppError {
    constructor(
        name,
        statuCode = STATUS_CODES.INTERNAL_ERROR,
        description = 'Internal Server Error',
        isOperational = true
    ) {
        super(name, statuCode, description, isOperational);
    }
}

// 400 
class BadRequestError extends AppError {
    constructor(
        description = 'Bad Request',
        logingErrorResponse
    ) {
        super(
            'NOT Found',
            STATUS_CODES.BAD_REQUEST,
            description,
            true,
            false,
            logingErrorResponse
        );
    }
}

// 400 
class ValidationError extends AppError {
    constructor(
        description = 'Validation Error',
        errorStack
    ) {
        super(
            'BAD REQUEST',
            STATUS_CODES.BAD_REQUEST,
            description,
            true,
            errorStack
        );
    }
}

module.exports = {
    AppError,
    ApiError,
    BadRequestError,
    ValidationError,
    STATUS_CODES
};

