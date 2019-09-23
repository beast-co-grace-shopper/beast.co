const router = require('express').Router()
const {User} = require('../db/models')

const HttpError = require('../utils/HttpError')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then(user => {
    if (user) {
      req.login = user.id
      req.session.userId = user.id
      req.json(user)
    } else {
      const err = new Error('Incorrect Username or Password')
      err.status = 401
      next(err)
    }
  })
})

router.delete('/logout', (req, res, next) => {
  //req.logout();
  req.session.destroy(err => {
    if (err) {
      return next(err)
    }
    res.status(204).end()
  })
})

router.get('/me', async (req, res, next) => {
  try {
    if (req.user) {
      res.json(req.user)
    } else if (req.session.userId) {
      const user = await User.findByPk(req.session.userId)
      user ? res.json(user) : res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const requestUserId = Number(req.params.userId)
    if (!req.user || req.user.id !== requestUserId) {
      throw new HttpError(401, 'ERROR: user not logged in or invalid')
    }

    const userOrders = await User.findUserOrders(requestUserId)
    if (userOrders) {
      console.log('found user orders: ', userOrders)
      res.status(200).json(userOrders)
    } else {
      throw new HttpError(500, 'ERROR: failed to GET user orders')
    }
  } catch (error) {
    next(error)
  }
})
