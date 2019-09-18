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
Cart.belongsToOne(User)
Cart.hasMany(Animal)
Animal.belongsToMany(Cart)

//a review instance belongs to one user
//a user instance has many reviews
//an animal instance has many reviews

Review.belongsToOne(User)
User.hasMany(Review)
Animal.hasMany(Review)

//an order instance belongs to one user
//a user instance has many orders
//an order instance has many animals

Order.belongsToOne(User)
User.hasMany(Order)
Order.hasMany(Animal, {through: 'animal_order', foreignKey: 'animalId'})

//an animal belongs to many categories
//a category belongs to many animals
Animal.belongsToMany(Category, {through: AnimalCategories})
Category.belongsToMany(Animal, {through: AnimalCategories})

//an animal belongs to many orders
//an order belongs to many animals
Animal.belongsToMany(Order, {through: AnimalOrder})
Order.hasMany(Animal, {though: AnimalOrder})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
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
