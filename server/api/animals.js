const router = require('express').Router()
const {Animal, Category} = require('../db/models')
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
    const animal = await Animal.findByPk(id)
    if (animal) {
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

router.post('/', authorizeAdmin, async (req, res, next) => {
  try {
    console.log('req', req.body)
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

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Animal.findByPk(req.params.id))
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedAnimal = await Animal.update(req.body)
    if (updatedAnimal) {
      res.status(200).json(updatedAnimal)
    } else {
      throw new HttpError(500, 'ERROR: failed to PUT (update) Animal')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', authorizeAdmin, async (req, res, next) => {
  try {
    const deleted = await Animal.destroy({where: {id: req.params.id}})
    if (deleted) {
      res.sendStatus(204)
    } else {
      throw new HttpError(500, 'ERROR: failed to DELETE Animal')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
