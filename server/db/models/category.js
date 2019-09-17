const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('categories.js', {
  category: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  }
})

module.exports = Category