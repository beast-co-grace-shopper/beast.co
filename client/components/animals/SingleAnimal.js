import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import {fetchSelectedAnimal} from '../../store/actions/animal-actions'

class SingleAnimal extends Component {
  constructor() {
    super()
    this.state = {
      Quantity: 0,
      Price: '$0'
    }
    this.UpdatedCart = false
  }

  changeQuantity(event) {
    let animal = this.props.animals.filter(
      CurrentAnimal => CurrentAnimal.id == this.props.match.params.id
    )
    let Price =
      '$' + Math.floor(event.target.value * animal[0].cost * 100) / 100
    this.setState({...this.state, Quantity: event.target.value, Price})
  }

  //this.props.user returns the user info

  render() {
    let animal = this.props.animals.filter(
      CurrentAnimal => CurrentAnimal.id == this.props.match.params.id
    )

    return (
      <div>
        {animal && animal.length === 1 ? (
          <Container className="card">
            <Row>
              <Col>
                <Image
                  src={animal[0].photo}
                  style={{height: '300px', width: '300px'}}
                  fluid
                />
              </Col>
              <Col>
                <h1>{animal[0].name}</h1>
                <div>
                  {animal[0].description && animal[0].description.length > 0 ? (
                    <p>Description: {animal[0].description}</p>
                  ) : (
                    ''
                  )}
                </div>
                <p>Price: ${animal[0].cost}</p>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <p>Price:</p>
                  </Col>
                  <Col>
                    <input
                      type="text"
                      disabled={true}
                      value={this.state.Price}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Quantity:</p>
                  </Col>
                  <Col>
                    <input
                      type="number"
                      onChange={event => {
                        this.changeQuantity(event)
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button>ADD TO CART</Button>
                  </Col>
                </Row>
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
    cart: state.cart,
    animals: state.animals,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSelectedAnimal: animalId => dispatch(fetchSelectedAnimal(animalId)),
  fetchUserCart: userId => dispatch(fetchUserCart(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnimal)
