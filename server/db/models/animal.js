const Sequelize = require('sequelize')
const db = require('../db')

const Animal = db.define('animal', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
})

module.exports = Animal
