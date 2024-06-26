var express = require('express')
var router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body
  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'bhd',
      product_data: {
        name: product.itemId.name,
        images: [product.itemId.image]
      },
      unit_amount: Math.round(product.itemId.price * 1000)
    },
    quantity: product.quantity
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'https://rmnd7bkgem.us-east-1.awsapprunner.com/paymentsuccess',
    cancel_url: 'https://rmnd7bkgem.us-east-1.awsapprunner.com/paymentfailed'
  })

  res.json({ id: session.id })
})
module.exports = router
