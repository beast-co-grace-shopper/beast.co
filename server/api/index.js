const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/animals', require('./animals'))
router.use('/categories', require('./categories'))
router.use('/cart', require('./cart'))
router.use('/orders', require('./orders'))
router.use('/review', require('./review'))
router.use('/checkout', require('./checkout'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
