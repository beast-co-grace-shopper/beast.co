import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import AnimalCard from '../Animal/AnimalCard'

/**
 * COMPONENT
 */
class Products extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="card">
        <h5 className="card-header card-text">Manage Products</h5>
        <Button className="ml-auto">Save</Button>
        {this.props.animals && this.props.animals.length
          ? this.props.animals.map(animal => (
              <AnimalCard animal={animal} key={animal.id} />
            ))
          : 'There are no animals in the database...'}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    animals: state.animals
  }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapState, mapDispatchToProps)(Products)
