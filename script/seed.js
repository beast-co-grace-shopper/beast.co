'use strict'

const chance = require('chance')(999)

const db = require('../server/db')
const {
  User,
  Animal,
  Category,
  Cart,
  AnimalCategories
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await User.create({
    firstName: chance.first(),
    lastName: chance.last(),
    address: chance.address(),
    address2: 'Apt. 1',
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip({plusfour: true}),
    email: 'cody@email.com',
    password: '123',
    admin: true
  })
  await User.create({
    firstName: chance.first(),
    lastName: chance.last(),
    address: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip({plusfour: true}),
    email: 'murphy@email.com',
    password: '123',
    admin: false
  })
  await User.create({
    firstName: chance.first(),
    lastName: chance.last(),
    address: chance.address(),
    address2: 'Apt. 12B',
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip({plusfour: true}),
    email: 'admin@admin.com',
    password: 'admin',
    admin: true
  })
  await User.create({
    firstName: chance.first(),
    lastName: chance.last(),
    address: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip(),
    email: 'guest@email.com',
    password: '123',
    admin: false
  })
  await User.create({
    firstName: chance.first(),
    lastName: chance.last(),
    address: chance.address(),
    city: chance.city(),
    state: chance.state(),
    zip: chance.zip(),
    email: 'boyardee@email.com',
    password: 'ravioli',
    admin: false
  })

  await Animal.create({
    name: 'Elephant',
    cost: 3999.99,
    description: 'This is a long test',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/African_Elephant.jpg/768px-African_Elephant.jpg'
  })
  await Animal.create({
    name: 'Pig',
    cost: 64.0,
    description: '0-2 porkchops worth.',
    photo: 'http://www.minecraftinformation.com/images/pig.png'
  })
  await Animal.create({
    name: 'Kiwi Bird',
    cost: 4.99,
    photo:
      'https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg'
  })
  await Animal.create({
    name: 'Baboon',
    cost: 2450.99,
    photo:
      'https://kids.sandiegozoo.org/sites/default/files/2018-07/animal-hero-hamadryas_0.jpg'
  })

  await Category.create({category: 'Farm Animals'})
  await Category.create({category: 'Large'})
  await Category.create({category: 'Intelligent'})
  await Category.create({category: 'exotic'})
  await Category.create({category: 'Bird'})

  const animalCategories = await Promise.all([
    AnimalCategories.create({categoryId: 1, animalId: 2}),
    AnimalCategories.create({categoryId: 2, animalId: 1}),
    AnimalCategories.create({categoryId: 3, animalId: 1}),
    AnimalCategories.create({categoryId: 3, animalId: 2}),
    AnimalCategories.create({categoryId: 4, animalId: 1}),
    AnimalCategories.create({categoryId: 5, animalId: 3}),
    AnimalCategories.create({categoryId: 3, animalId: 4}),
    AnimalCategories.create({categoryId: 4, animalId: 4})
  ])

  console.log(`seeded ${animalCategories.length} animal categories`)

  await Cart.create({
    quantity: 2,
    userId: 2,
    animalId: 2
  })
  await Cart.create({
    quantity: 4,
    userId: 2,
    animalId: 3
  })

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
