const router = require('express').Router()
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

router.post('/', async (req, res, next) => {
  try {
    const animalId = req.body.animalId
    const userId = req.body.userId
    const quantity = req.body.quantity
    await Cart.create({
      userId,
      animalId,
      quantity
    })
    res.send('Item added to cart!')
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
    const userId = req.body.animalId
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
