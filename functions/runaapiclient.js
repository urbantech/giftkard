const axios = require('axios');

const runaAPI = axios.create({
    baseURL: 'https://api.runa.io/', // Replace with the actual base URL of 
Runa's API
    timeout: 10000, // Optional: Set a request timeout
    headers: {
        'Authorization': 'Basic YOUR_ENCODED_AUTH_STRING', // Replace with 
your encoded Basic Auth string
        'Content-Type': 'application/json'
    }
});

module.exports = runaAPI;

