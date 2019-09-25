/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Category = db.model('category')

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/categories/', () => {
    const newCategory = 'Reptile'

    beforeEach(() => {
      return Category.create({
        category: newCategory
      })
    })

    it('GET /api/categories', async () => {
      const res = await request(app)
        .get('/api/categories')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].category).to.be.equal(newCategory)
    })
  })
})
