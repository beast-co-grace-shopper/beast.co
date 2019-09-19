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
    this.props.fetchSelectedAnimal(this.props.match.params.id)
  }

  render() {
    return (
      <div>
        {this.props.animals && this.props.animals.length === 1 ? (
          <Container className="card">
            <Row>
              <Col>
                <Image
                  src={this.props.animals[0].photo}
                  style={{height: '300px', width: '300px'}}
                  fluid
                />
              </Col>
              <Col>
                <h1>{this.props.animals[0].name}</h1>
                <p>Description: {this.props.animals[0].description}</p>
                <p>Price: ${this.props.animals[0].cost}</p>
              </Col>
              <Col>
                <p>$0</p>
                <p>Quantity: 0</p>
                <Button>ADD TO CART</Button>
              </Col>
            </Row>
          </Container>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    animals: state.animals
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSelectedAnimal: animalId => dispatch(fetchSelectedAnimal(animalId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnimal)
