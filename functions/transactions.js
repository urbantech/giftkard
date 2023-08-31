exports.createTransaction = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const transaction = req.body;
        try {
            const newTransaction = await 
admin.firestore().collection('Transactions').add(transaction);
            res.status(200).send({ transactionID: newTransaction.id });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.getTransaction = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'GET') {
            return res.status(400).send('Invalid request');
        }
        const transactionID = req.query.transactionID;
        try {
            const transactionDoc = await 
admin.firestore().collection('Transactions').doc(transactionID).get();
            if (transactionDoc.exists) {
                res.status(200).send(transactionDoc.data());
            } else {
                res.status(404).send('Transaction not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.deleteTransaction = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'DELETE') {
            return res.status(400).send('Invalid request');
        }
        const transactionID = req.query.transactionID;
        try {
            await 
admin.firestore().collection('Transactions').doc(transactionID).delete();
            res.status(200).send({ message: 'Transaction deleted 
successfully' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

