"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (error) => {
    const errors = [
        {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: 'Invalid ID',
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: errors,
    };
};
exports.handleCastError = handleCastError;
