const functions = require("firebase-functions");

const express = require('express')
const cors = require('cors');
const { response } = require("express");
const stripe = require ('stripe') ('sk_test_51INgwJJ70jY5kU8EMjRKdW6W3vhFzT9Gn2VOxwJWy9yLehZ0Fsune8R2Tfqf3Yu86ZN68gjLSMzJ9BRKqghVshXh00QRT1Zz6z')

const app = express();

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/', (request, response) => response.status(200).send('Hello World'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('payment request received', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    })
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

exports.api = functions.https.onRequest(app)
// 