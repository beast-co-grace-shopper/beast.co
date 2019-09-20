import React, {Component} from 'react'
import queryString from 'query-string'

import AnimalCard from './AnimalCard'

// --[ All Animals ]-----------------------------------------------------------
//
// This component is used to render the list of all animals. Note that list may
// be either filtered or the result of a search. In other words, it may
// not actually represent ALL animals in the database
//
class AllAnimals extends Component {
  filterAnimals() {
    const animals = this.props.animals
    const search = this.props.location.search

    if (search) {
      const query = queryString.parse(search)

      // .../animals?search=<query string>
      if (query.search) {
        return animals.filter(animal => {
          const name = animal.name.toLowerCase()
          const searchString = query.search.toLowerCase()

          return name.includes(searchString)
        })
      } else if (query.category) {
        // .../animals?category=<category>
        return animals.filter(animal => {
          let matchedCategories = animal.categories.filter(
            currCategory => currCategory.category === query.category
          )

          return matchedCategories.length > 0
        })
      }
    }

    return animals
  }

  render() {
    const animals = this.filterAnimals()

    return (
      <div>
        <h1>ALL ANIMALS</h1>
        <div>
          {animals && animals.length
            ? animals.map(animal => (
                <AnimalCard key={animal.id} animal={animal} />
              ))
            : 'There are no animals in the database...'}
        </div>
      </div>
    )
  }
}

export default AllAnimals
