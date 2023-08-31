// stripeIntegration.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const { cors, validateInput } = require('./utils');

// Create a Payment Intent
exports.createPaymentIntent = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== 'POST' || !validateInput(req.body)) {
            return res.status(400).send('Invalid request');
        }
        const { amount, currency } = req.body; // Amount should be in the 
smallest currency unit (e.g., cents for USD)
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
            });
            res.status(200).send(paymentIntent);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

// Handle Stripe Webhook
exports.handleStripeWebhook = functions.https.onRequest((req, res) => {
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, 
req.headers['stripe-signature'], 'YOUR_WEBHOOK_SECRET');
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        // Handle the payment confirmation
        // E.g., provide the user with the gift card
        res.status(200).send('Payment successful');
    } else {
        res.status(200).send('

