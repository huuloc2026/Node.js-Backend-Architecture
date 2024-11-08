// success.response.js
'use strict'

/**
 * Standard format for success response
 * @param {number} statusCode - HTTP status code
 * @param {string} message - A short message describing the success
 * @param {object} metadata - Additional data to include in the response (optional)
 * @returns {object} - A formatted success response object
 */
const successResponse = (statusCode, message, metadata = null) => {
    return {
        status: 'success',
        statusCode: statusCode,
        message: message,
        metadata: metadata,
    };
};

module.exports = successResponse;
