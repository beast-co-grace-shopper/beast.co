const router = require('express').Router()
const HttpError = require('../utils/HttpError')
const stripe = require('stripe')('sk_test_Ulh5c2JG4xYsAt3BnShNbuLE00Z8sTOwKk')

router.use(require('body-parser').text())

router.post('/charge', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: Math.floor(req.body.amount * 10) / 10,
      currency: 'usd',
      description: 'Beast Co',
      source: req.body.token,
      receipt_email: req.body.email
    })

    res.status(204).json({status})
  } catch (err) {
    res.status(500).end()
  }
})

module.exports = router
