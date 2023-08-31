// Adds a new user to the Users collection
exports.addUser = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const user = req.body;
        try {
            const newUser = await 
admin.firestore().collection('Users').add(user);
            res.status(200).send({ userID: newUser.id });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

// Retrieves user details based on UserID
exports.getUser = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'GET') {
            return res.status(400).send('Invalid request');
        }
        const userID = req.query.userID;
        try {
            const userDoc = await 
admin.firestore().collection('Users').doc(userID).get();
            if (userDoc.exists) {
                res.status(200).send(userDoc.data());
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

// Updates user details based on UserID
exports.updateUser = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'PUT' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const userID = req.query.userID;
        const updatedData = req.body;
        try {
            await 
admin.firestore().collection('Users').doc(userID).update(updatedData);
            res.status(200).send({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

// Removes a user from the Users collection
exports.deleteUser = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'DELETE') {
            return res.status(400).send('Invalid request');
        }
        const userID = req.query.userID;
        try {
            await 
admin.firestore().collection('Users').doc(userID).delete();
            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

