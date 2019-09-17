'use strict'

const db = require('../server/db')
const {User, Animal} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
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
    })
  ])

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
