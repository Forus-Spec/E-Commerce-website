import stripe from "stripe";
// createPaymentIntent
export const createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "usd"
  });
  // This is our res.status functionality which is amazing and awesome
  res.status.json({
    clientSecret: paymentIntent.client_secret
  });
};
