const crypto = require('crypto')
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
  photo: {
    type: Sequelize.String,
    defaultValue: ''
  }
})

module.exports = Animal