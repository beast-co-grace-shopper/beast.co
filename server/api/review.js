/* eslint-disable complexity */
const router = require('express').Router()
const {Review} = require('../db/models')
const HttpError = require('../utils/HttpError')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    await Review.create(req.body)
  } catch (err) {
    console.log(err)
  }
})
