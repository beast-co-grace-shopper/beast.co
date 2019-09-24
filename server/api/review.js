/* eslint-disable complexity */
const router = require('express').Router()
const {Review} = require('../db/models')
const HttpError = require('../utils/HttpError')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body)
    res.status(201).json(newReview)
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const allReviews = await Review.findAll({where: {animalId: req.params.id}})

    res.send(allReviews)
  } catch (e) {
    next(e)
  }
})
