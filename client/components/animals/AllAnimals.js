import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  fetchAnimals,
  filterAnimalCategories
} from '../../store/actions/animal-actions'
import AnimalCard from './AnimalCard'

class AllAnimals extends Component {
  componentDidMount() {
    this.props.fetchAnimals()
    this.props.filterAnimalCategories('Intelligent')
  }

  render() {
    const animals = this.props.animals

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

const mapStateToProps = state => ({
  animals: state.animals
})

const mapDispatchToProps = dispatch => ({
  fetchAnimals: () => dispatch(fetchAnimals()),
  filterAnimalCategories: search => dispatch(filterAnimalCategories(search))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllAnimals)
