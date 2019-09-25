const router = require('express').Router()
const {Category} = require('../db/models')
const HttpError = require('../utils/HttpError')

module.exports = router

router.param('id', async (req, res, next, id) => {
  try {
    const category = await Category.findByPk(id)
    if (category) {
      req.category = category
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
    const allCategorys = await Category.findAll()
    if (allCategorys) {
      res.status(200).json(allCategorys)
    } else {
      throw new HttpError(500, 'ERROR: failed to GET all Categorys')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body)
    if (newCategory) {
      res.status(201).json(newCategory)
    } else {
      throw new HttpError(500, 'ERROR: failed to POST (create) new Category')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  res.status(200).json(req.Category)
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedCategory = await req.Category.update(req.body)
    if (updatedCategory) {
      res.status(200).json(updatedCategory)
    } else {
      throw new HttpError(500, 'ERROR: failed to PUT (update) Category')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteCount = await req.Category.destroy()
    if (deleteCount) {
      res.sendStatus(204)
    } else {
      throw new HttpError(500, 'ERROR: failed to DELETE Category')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
