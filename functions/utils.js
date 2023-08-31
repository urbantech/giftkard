// utils.js

const cors = require('cors')({ origin: true });

// Basic input validation function
function validateInput(data) {
    if (!data || Object.keys(data).length === 0) {
        return false;
    }
    return true;
}

module.exports = {
    cors,
    validateInput
};

