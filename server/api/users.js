const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = 1
  } else {
    req.session.cart++
  }
  console.log('req.session.cart', req.session.cart)
  next()
})

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
