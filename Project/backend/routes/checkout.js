const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingcollection');
const stripe = require('stripe')('your stripe key HERE');

router.post('/', async (req, res) => {
    const { personName, personEmail, roomNo, totalPayment, roomImage, bookingid } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'pkr',
                        product_data: {
                            name: `Room ${roomNo} - ${personName}`,
                            images: [roomImage],
                        },
                        unit_amount: totalPayment * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://hotelair.netlify.app/checkout`,
            cancel_url: '=https://lavender-iron-azimuth.glitch.me/cancel',
        });

        await changestatus(bookingid);


        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).json({ error: 'An error occurred during the checkout process.' });
    }
});


const changestatus = async (bookingId) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId, 
            { statusofBooking: 'Checkout' }, 
            { new: true }
        );

        if (updatedBooking) {
            console.log(`Booking ${bookingId} updated to 'Checkout':`, updatedBooking);
        } else {
            console.error(`Booking ${bookingId} not found`);
        }
    } catch (err) {
        console.error('Error updating booking:', err);
    }
}

module.exports = router;
