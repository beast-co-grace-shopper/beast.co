import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import AnimalCard from '../Animal/AnimalCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {postAnimal, deleteAnimal} from '../../store/actions/animal-actions'

/**
 * COMPONENT
 */
class Products extends Component {
  componentDidMount() {}

  handleSubmit = event => {
    let newHorse = {
      name: event.target.title.value,
      photo: event.target.photo.value,
      cost: event.target.cost.value,
      description: event.target.description.value
    }

    this.props.postAnimal(newHorse)
  }

  deleteListing = num => {
    this.props.deleteAnimal(num)
  }

  render() {
    return (
      <div className="card">
        <h5 className="card-header card-text">Manage Products</h5>

        <Container className="card">
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Animal Name</Form.Label>
                <Form.Control name="title" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Image URL:</Form.Label>
                <Form.Control name="photo" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Description:</Form.Label>
                <Form.Control name="description" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Price:</Form.Label>
                <Form.Control name="cost" />
              </Form.Group>
            </Form.Row>

            <Button type="submit">Create Listing</Button>
          </Form>
        </Container>

        {this.props.animals && this.props.animals.length
          ? this.props.animals.map(animal => (
              <Container key={animal.id}>
                <AnimalCard animal={animal} />
                <Button
                  onClick={() => {
                    this.deleteListing(animal.id)
                  }}
                >
                  Remove Listing Above
                </Button>
              </Container>
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

const mapDispatchToProps = dispatch => ({
  postAnimal: animal => dispatch(postAnimal(animal)),
  deleteAnimal: animalId => dispatch(deleteAnimal(animalId))
})

export default connect(mapState, mapDispatchToProps)(Products)
