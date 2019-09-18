const Sequelize = require('sequelize')
const db = require('../db')

const AnimalOrder = db.define('animalOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  purchasePrice: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = AnimalOrder
