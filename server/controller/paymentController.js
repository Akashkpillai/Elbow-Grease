const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_KEY)

require('dotenv').config()

 const StripePayment = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Elbow-Grease',
            },
            unit_amount: 200 * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout-failed`,
    });
  
    res.send({url : session.url});
  }

  module.exports = {
    StripePayment
  }