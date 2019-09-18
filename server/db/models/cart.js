const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  //   userId: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //     validate: {
  //       notEmpty: true
  //     }
  //   },
  //   animalId: {
  //     type: Sequelize.INTEGER
  //   },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart
