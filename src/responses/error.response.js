// error.response.js
'use strict'

/**
 * Standard format for error response
 * @param {number} statusCode - HTTP status code (400, 404, 500, etc.)
 * @param {string} message - A short message describing the error
 * @param {object} details - Additional details about the error (optional)
 * @returns {object} - A formatted error response object
 */
const errorResponse = (statusCode, message, details = null) => {
    return {
        status: 'error',
        statusCode: statusCode,
        message: message,
        details: details,
    };
};

module.exports = errorResponse;
