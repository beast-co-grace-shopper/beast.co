'use strict'

const db = require('../server/db')
const {
  User,
  Animal /*, Category, AnimalCategory */
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      admin: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      admin: false
    }),
    User.create({
      email: 'admin@admin.com',
      password: 'admin',
      admin: true
    }),
    User.create({
      email: 'guest@email.com',
      password: '123',
      admin: false
    }),
    User.create({
      email: 'boyardee@email.com',
      password: 'ravioli',
      admin: false
    })
  ])
  console.log(`seeded ${users.length} users`)

  const animals = await Promise.all([
    Animal.create({
      name: 'Elephant',
      cost: 3999.99,
      description: 'This is a long test',
      photo:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/African_Elephant.jpg/768px-African_Elephant.jpg'
    }),
    Animal.create({
      name: 'Pig',
      cost: 64.0,
      description: '0-2 porkchops worth.',
      photo: 'http://www.minecraftinformation.com/images/pig.png'
    }),
    Animal.create({
      name: 'Kiwi Bird',
      cost: 4.99,
      photo:
        'https://www.doc.govt.nz/thumbs/hero/contentassets/a450e32f0b824531858d566404c21884/southern-brown-kiwi-tokoeka-stewart-island-photo-credit-alina-thiebes1920.jpg'
    }),
    Animal.create({
      name: 'Baboon',
      cost: 2450.99,
      photo:
        'https://kids.sandiegozoo.org/sites/default/files/2018-07/animal-hero-hamadryas_0.jpg'
    })
  ])
  console.log(`seeded ${animals.length} animals`)

  /*
  THESE ARE OBJECTS TO SEED FOR ANIMAL CATEGORIES AND CATEGORIES WHEN THEY ARE COMPLETE
  ** import the models when ready

  const categories = await Promise.all([
    Category.create({category: "Farm Animals"});
    Category.create({category: "Large"});
    Category.create({category: "Intelligent"});
    Category.create({category: "exotic"});
    Category.create({category: "Bird"});
    }),
  ])
  
  console.log(`seeded ${categories.length} categories`)

  const animalCategories = await Promise.all([
    AnimalCategory.create({categoryId:1,animalId:1});
    AnimalCategory.create({categoryId:2,animalId:2});
    AnimalCategory.create({categoryId:3,animalId:1});
    AnimalCategory.create({categoryId:3,animalId:2});
    AnimalCategory.create({categoryId:4,animalId:2});
    AnimalCategory.create({categoryId:5,animalId:3});
    AnimalCategory.create({categoryId:3,animalId:4});
    AnimalCategory.create({categoryId:4,animalId:4});
  ])

  console.log(`seeded ${animalCategories.length} animal categories`)

  */

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
