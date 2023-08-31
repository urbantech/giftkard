exports.createOrder = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const order = req.body;
        try {
            const newOrder = await 
admin.firestore().collection('Orders').add(order);
            res.status(200).send({ orderID: newOrder.id });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.getOrder = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'GET') {
            return res.status(400).send('Invalid request');
        }
        const orderID = req.query.orderID;
        try {
            const orderDoc = await 
admin.firestore().collection('Orders').doc(orderID).get();
            if (orderDoc.exists) {
                res.status(200).send(orderDoc.data());
            } else {
                res.status(404).send('Order not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.updateOrderStatus = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'PUT' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const orderID = req.query.orderID;
        const updatedData = req.body;
        try {
            await 
admin.firestore().collection('Orders').doc(orderID).update(updatedData);
            res.status(200).send({ message: 'Order updated successfully' 
});
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

exports.deleteOrder = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'DELETE') {
            return res.status(400).send('Invalid request');
        }
        const orderID = req.query.orderID;
        try {
            await 
admin.firestore().collection('Orders').doc(orderID).delete();
            res.status(200).send({ message: 'Order deleted successfully' 
});
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

