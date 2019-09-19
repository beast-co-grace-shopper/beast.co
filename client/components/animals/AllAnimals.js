import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'

import {fetchAnimals} from '../../store/actions/animal-actions'
import AnimalCard from './AnimalCard'

class AllAnimals extends Component {
  componentDidMount() {
    this.props.fetchAnimals()
  }

  render() {
    const animals = this.props.animals

    return (
      <div>
        <h1>ALL ANIMALS</h1>
        <div>
          {animals && animals.length
            ? animals.map(animal => (
                <Link to={`/animal/${animal.id}`} key={animal.id}>
                  <AnimalCard animal={animal} />
                </Link>
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
  fetchAnimals: () => dispatch(fetchAnimals())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllAnimals)
