exports.initiateGroupGift = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const groupGift = req.body;
        try {
            const newGroupGift = await 
admin.firestore().collection('GroupGifts').add(groupGift);
            res.status(200).send({ groupGiftID: newGroupGift.id });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.getGroupGift = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'GET') {
            return res.status(400).send('Invalid request');
        }
        const groupGiftID = req.query.groupGiftID;
        try {
            const groupGiftDoc = await 
admin.firestore().collection('GroupGifts').doc(groupGiftID).get();
            if (groupGiftDoc.exists) {
                res.status(200).send(groupGiftDoc.data());
            } else {
                res.status(404).send('Group gift not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.contributeToGroupGift = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const groupGiftID = req.query.groupGiftID;
        const contribution = req.body;
        try {
            const newContribution = await 
admin.firestore().collection('GroupGifts').doc(groupGiftID).collection('Contributors').add(contribution);
            res.status(200).send({ contributorID: newContribution.id });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.finalizeGroupGift = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'PUT' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const groupGiftID = req.query.groupGiftID;
        const updatedData = req.body;
        try {
            await 
admin.firestore().collection('GroupGifts').doc(groupGiftID).update(updatedData);
            res.status(200).send({ message: 'Group gift finalized 
successfully' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

