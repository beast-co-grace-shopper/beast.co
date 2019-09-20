const router = require('express').Router()
const {Order, User} = require('../db/models')
const HttpError = require('../utils/HttpError')

module.exports = router

router.param('id', async (req, res, next, id) => {
  try {
    const user = await User.findByPk(id)
    if (user) {
      req.animal = animal
      next()
    } else {
      throw new HttpError(404)
    }
  } catch (error) {
    next(error)
  }
})

// router HTTP methods. rename/redefine/delete as needed...
// demonstration of use of static model methods; see db/index.js...
router.get('/', async (req, res, next) => {
  try {
    const allAnimals = await Animal.findAll({
      include: [{model: Category}]
    })
    if (allAnimals) {
      res.status(201).json(allAnimals)
    } else {
      throw new HttpError(500, 'ERROR: failed to GET all Animals')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newAnimal = await Animal.create(req.body)
    if (newAnimal) {
      res.status(201).json(newAnimal)
    } else {
      throw new HttpError(500, 'ERROR: failed to POST (create) new Animal')
    }
  } catch (error) {
    next(error)
  }
})
