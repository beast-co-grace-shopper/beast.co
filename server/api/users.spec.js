/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'lula@email.com'

    beforeEach(() => {
      User.create({
        email: codysEmail
      })
    })

    it('GET /api/users should fail due to privelage restrictions', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(401)
    })
    // expect(res.body).to.be.an('array')
    // expect(res.body[0].email).to.be.equal(codysEmail)

    // it('PUT /api/users/login', async () => {
    //   const res = await request(app)
    //   .put('/api/users/login', {email:codysEmail,password:123} )
    //   .expect(201);
    //   //console.log(res);
    //   expect(res.body.email).to.be.equal(codysEmail)
    // })
  }) // end describe('/api/users')
}) // end describe('User routes')
