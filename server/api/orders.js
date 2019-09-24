/* eslint-disable complexity */
const router = require('express').Router()
const {Animal, AnimalOrder, Cart, Order, User} = require('../db/models')
const HttpError = require('../utils/HttpError')

module.exports = router

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(401)
  }
}

router.param('id', async (req, res, next, id) => {
  try {
    const order = await Order.findByPk(id)
    if (order) {
      req.order = order
      next()
    } else {
      throw new HttpError(404)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/allOrders', authorizeAdmin, async (req, res, next) => {
  try {
    const orders = await User.findAllOrders()
    res.send(orders)
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.status(201).json(req.order)
})

router.post('/', async (req, res, next) => {
  try {
    let userId = req.user && req.user.id
    if (!userId) {
      // attempt to find the User by session identifier...
      userId = await User.findUserBySession(req.session.id)
      if (!userId) {
        throw new HttpError(500, 'ERROR: failed to create user by session')
      }
    }

    // TBD: verify payment information...

    const usersCart = await Cart.findUsersCart(userId)
    if (!usersCart) {
      throw new HttpError(500, 'ERROR: failed to find cart for user')
    }

    // console.log('got the following order from client: ', req.body)
    // ensure that the user id, determined for this session, is associated
    // with the new order...
    req.body.userId = userId

    const newOrder = await Order.create(req.body)
    if (!newOrder) {
      throw new HttpError(500, 'ERROR: failed to create order for user')
    }
    // console.log('created new order: ', newOrder)

    // move cart contents to animalOrders...
    const animalOrderData = usersCart.map(item => ({
      quantity: item.quantity,
      purchasePrice: item.animal.cost,
      orderId: newOrder.id,
      animalId: item.animal.id
    }))

    const animalOrders = await AnimalOrder.bulkCreate(animalOrderData, {
      validate: true
    })
    if (!animalOrders.length) {
      throw new HttpError(500, 'ERROR: failed to create all animal orders')
    }
    // console.log('created animal orders', animalOrders)
    // add the ordered items to the new order, for the client confirmation
    // dialog...
    const orderWithCart = await newOrder.reload({
      include: [
        {
          model: AnimalOrder,
          as: 'cart',
          include: [
            {
              model: Animal
            }
          ]
        }
      ]
    })

    // console.log('order with cart: ', orderWithCart)
    // console.log('cart: ', orderWithCart.cart)

    // destroy cart contents (for future purchases)...
    const destroyedCartItemCount = await Cart.destroyUsersCart(userId)
    if (destroyedCartItemCount !== usersCart.length) {
      throw new HttpError(500, 'ERROR: failed to destroy user cart')
    }
    console.log('destroyed user cart')

    res.status(201).json(orderWithCart)
  } catch (error) {
    next(error)
  }
})
