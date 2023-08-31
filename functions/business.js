exports.addBusiness = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const business = req.body;
        try {
            const newBusiness = await 
admin.firestore().collection('Businesses').add(business);
            res.status(200).send({ businessID: newBusiness.id });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.getBusiness = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'GET') {
            return res.status(400).send('Invalid request');
        }
        const businessID = req.query.businessID;
        try {
            const businessDoc = await 
admin.firestore().collection('Businesses').doc(businessID).get();
            if (businessDoc.exists) {
                res.status(200).send(businessDoc.data());
            } else {
                res.status(404).send('Business not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.updateBusiness = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'PUT' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const businessID = req.query.businessID;
        const updatedData = req.body;
        try {
            await 
admin.firestore().collection('Businesses').doc(businessID).update(updatedData);
            res.status(200).send({ message: 'Business updated 
successfully' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.deleteBusiness = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'DELETE') {
            return res.status(400).send('Invalid request');
        }
        const businessID = req.query.businessID;
        try {
            await 
admin.firestore().collection('Businesses').doc(businessID).delete();
            res.status(200).send({ message: 'Business deleted 
successfully' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

