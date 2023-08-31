// Adds a new gift card to the GiftCards collection
exports.addGiftCard = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const giftCard = req.body;
        try {
            const newGiftCard = await 
admin.firestore().collection('GiftCards').add(giftCard);
            res.status(200).send({ cardID: newGiftCard.id });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

// Retrieves gift card details based on CardID
exports.getGiftCard = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'GET') {
            return res.status(400).send('Invalid request');
        }
        const cardID = req.query.cardID;
        try {
            const cardDoc = await 
admin.firestore().collection('GiftCards').doc(cardID).get();
            if (cardDoc.exists) {
                res.status(200).send(cardDoc.data());
            } else {
                res.status(404).send('Gift card not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

// Updates gift card details based on CardID
exports.updateGiftCard = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'PUT' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const cardID = req.query.cardID;
        const updatedData = req.body;
        try {
            await 
admin.firestore().collection('GiftCards').doc(cardID).update(updatedData);
            res.status(200).send({ message: 'Gift card updated 
successfully' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

// Removes a gift card from the GiftCards collection
exports.deleteGiftCard = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'DELETE') {
            return res.status(400).send('Invalid request');
        }
        const cardID = req.query.cardID;
        try {
            await 
admin.firestore().collection('GiftCards').doc(cardID).delete();
            res.status(200).send({ message: 'Gift card deleted 
successfully' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

