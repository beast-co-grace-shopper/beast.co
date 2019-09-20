const router = require('express').Router()

const HttpError = require('../utils/HttpError')
const {Cart, Animal, User} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {userId: req.params.id},
      include: [{model: Animal}, {model: User}]
    })
    res.json(cart)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.get('/all', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      include: [{model: Animal}, {model: User}]
    })
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

// When a cart is first "created" (the first cart item is added),
// a check is made if the user is actually logged in (req.user
// is checked). If not, an attempt is made to find the user,
// by the session identifier, in the User table.
//
// If not found, a User instance is created with the session identifier
// as key. This user instance supports guest cart operations without the user
// having an account and logging in...
//
router.post('/', async (req, res, next) => {
  try {
    let userId = req.user && req.user.id
    if (!userId) {
      // attempt to find the User by session identifier...
      userId = await User.findOrCreateUserBySession(req.session.id)
      if (!userId) {
        throw new HttpError(500, 'ERROR: faled to create user by session')
      }
    }

    const animalId = req.body.animalId
    const quantity = req.body.quantity
    const newCartItem = await Cart.create({
      userId,
      animalId,
      quantity
    })
    if (newCartItem) {
      // return the ENTIRE cart to the client to facilitate cart management...
      const cart = await Cart.findUsersCart(userId)
      if (cart) {
        res.json(cart)
      } else {
        throw new HttpError(500, 'ERROR: failed to obtain all cart items')
      }
    } else {
      throw HttpError(500, 'ERROR: failed to create cart item')
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const animalId = req.body.animalId
    const userId = req.body.animalId
    await Cart.destroy({where: {userId, animalId}})
    res.send('Cart Cleared!')
  } catch (err) {
    next(err)
  }
})

router.delete('/all', async (req, res, next) => {
  try {
    const userId = req.body.userId
    await Cart.destroy({where: {userId}})
    res.send('Cart Cleared!')
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const userId = req.body.userId
    const quantity = req.body.quantity
    const animalId = req.body.animalId
    await Cart.update({quantity}, {where: {userId, animalId}})
    res.send(
      await Cart.findAll({
        where: {userId, animalId},
        include: [{model: Animal}, {model: User}]
      })
    )
  } catch (err) {
    next(err)
  }
})
