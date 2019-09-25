const router = require('express').Router()
const {User} = require('../db/models')

const HttpError = require('../utils/HttpError')
module.exports = router

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(401)
  }
}

router.param('userId', async (req, res, next, userId) => {
  try {
    const user = await User.findByPk(userId)
    if (user) {
      req.requestedUser = user
      next()
    } else {
      throw new HttpError(500, 'ERROR: could not GET user')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/', authorizeAdmin, async (req, res, next) => {
  try {
    const users = await User.findAllUsers()
    if (users) {
      res.json(users)
    } else {
      throw new HttpError(500, 'ERROR: failed to GET users')
    }
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

router.put('/me', async (req, res, next) => {
  try {
    const {email, address, city, state, zip, firstName, lastName} = req.body
    await User.update(
      {address, city, state, zip, firstName, lastName},
      {where: {email}}
    )
    let currentUser = await User.findOne({where: {email}})
    res.json(currentUser)
  } catch (err) {
    console.log(err)
  }
})

router.put('/:userId', authorizeAdmin, async (req, res, next) => {
  try {
    const updatedUser = await req.requestedUser.update(req.body)
    if (updatedUser) {
      // refetch  users and reply with the list of updated users...
      const users = await User.findAllUsers()
      if (users) {
        res.status(200).json(users)
      } else {
        throw new HttpError(500, 'ERROR: failed to GET all users')
      }
    } else {
      throw new HttpError(500, 'ERROR: failed to PUT user')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', authorizeAdmin, async (req, res, next) => {
  try {
    const deleteCount = await req.requestedUser.destroy()
    if (deleteCount) {
      // refetch remaining users and reply with the list of updated users...
      const users = await User.findAllUsers()
      if (users) {
        res.status(200).json(users)
      } else {
        throw new HttpError(500, 'ERROR: failed to GET all users')
      }
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const requestUserId = req.requestedUser.id
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
