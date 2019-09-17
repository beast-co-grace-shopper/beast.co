const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  purchaseDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true
    }
  },
  totalCost: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  itemTotal: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  deliveryType: {
    type: Sequelize.STRING,
    defaultValue: 'Standard',
    validate: {
      isIn: [['Standard', 'Express', 'Overnight']]
    }
  }
})

module.exports = Order
