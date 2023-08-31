const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

exports.simpleFunction = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        res.json({ message: 'This is a simple Cloud Function' });
    });
});

