const User = require('./user')
const Animal = require('./animal')
const Category = require('./category')
const Order = require('./order')
const Review = require('./review')
const Cart = require('./cart')
const AnimalCategories = require('./animalCategories')
const AnimalOrder = require('./animalOrder')

//a user instance has one cart
//a cart instance belongs to one user
//a cart instance has many animals
//an animal can belong in many user carts

User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsTo(Animal)
//Animal.hasMany(Cart)

//a review instance belongs to one user
//a user instance has many reviews
//an animal instance has many reviews

Review.belongsTo(User)
User.hasMany(Review)
Animal.hasMany(Review)

//an order instance belongs to one user
//a user instance has many orders
//an order instance has many animals

Order.belongsTo(User)
User.hasMany(Order)

//an animal belongs to many categories
//a category belongs to many animals
Animal.belongsToMany(Category, {through: AnimalCategories})
Category.belongsToMany(Animal, {through: AnimalCategories})

//an animal belongs to many orders
//an order belongs to many animals

Order.belongsToMany(Animal, {through: AnimalOrder})

// --[ Helper Methods Requiring Multiple Models ]------------------------------
Cart.findUsersCart = function(userId) {
  return Cart.findAll({
    where: {userId: userId},
    include: [{model: Animal}, {model: User}]
  })
}

Cart.destroyUsersCart = function(userId) {
  return Cart.destroy({
    where: {userId: userId}
  })
}

module.exports = {
  User,
  Animal,
  Category,
  Order,
  Review,
  Cart,
  AnimalCategories,
  AnimalOrder
}
