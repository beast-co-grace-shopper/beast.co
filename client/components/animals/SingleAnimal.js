import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import {fetchSelectedAnimal} from '../../store/actions/animal-actions'

class SingleAnimal extends Component {
  componentDidMount() {
    if (this.props.selectedAnimalId) {
      this.props.fetchSelectedAnimal(this.props.selectedAnimalId)
    }
  }

  render() {
    const animals = this.props.animals
    if (animals.length > 0)
      return (
        <div>
          {animals && animals.length > 0 ? (
            <Container className="card">
              <Row>
                <Col>
                  <Image
                    src={animals[0].photo}
                    style={{height: '300px', width: '300px'}}
                    fluid
                  />
                </Col>
                <Col>
                  <h1>{animals[0].name}</h1>
                  <p>Description: {animals[0].description}</p>
                  <p>Price: ${animals[0].cost}</p>
                </Col>
                <Col>
                  <p>$0</p>
                  <p>Quantity: 0</p>
                  <Button>ADD TO CART</Button>
                </Col>
              </Row>
            </Container>
          ) : (
            'This animal could not be captured...'
          )}
        </div>
      )
  }
}

const mapStateToProps = state => ({
  animals: state.animals
})

const mapDispatchToProps = dispatch => ({
  fetchSelectedAnimal: animalId => dispatch(fetchSelectedAnimal(animalId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnimal)
