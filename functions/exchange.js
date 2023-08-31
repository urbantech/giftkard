exports.listGiftCardForExchange = functions.https.onRequest((req, res) => 
{
    return cors(req, res, async () => {
        if (req.method !== 'POST' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const listing = req.body;
        try {
            const newListing = await 
admin.firestore().collection('ExchangeListings').add(listing);
            res.status(200).send({ listingID: newListing.id });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.getExchangeListing = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'GET') {
            return res.status(400).send('Invalid request');
        }
        const listingID = req.query.listingID;
        try {
            const listingDoc = await 
admin.firestore().collection('ExchangeListings').doc(listingID).get();
            if (listingDoc.exists) {
                res.status(200).send(listingDoc.data());
            } else {
                res.status(404).send('Listing not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.updateExchangeListingStatus = functions.https.onRequest((req, res) 
=> {
    return cors(req, res, async () => {
        if (req.method !== 'PUT' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const listingID = req.query.listingID;
        const updatedData = req.body;
        try {
            await 
admin.firestore().collection('ExchangeListings').doc(listingID).update(updatedData);
            res.status(200).send({ message: 'Listing updated successfully' 
});
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.deleteExchangeListing = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'DELETE') {
            return res.status(400).send('Invalid request');
        }
        const listingID = req.query.listingID;
        try {
            await 
admin.firestore().collection('ExchangeListings').doc(listingID).delete();
            res.status(200).send({ message: 'Listing deleted successfully' 
});
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

