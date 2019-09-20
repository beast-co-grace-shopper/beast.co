import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import {
  addAnimalToCart,
  updateAnimalInCart
} from '../../store/actions/cart-actions'

class SingleAnimal extends Component {
  constructor() {
    super()
    this.state = {
      Quantity: 0,
      Price: '$0',
      alreadyInCart: false
    }
  }

  changeQuantity(event) {
    let animal = this.props.animals.filter(
      CurrentAnimal => CurrentAnimal.id == this.props.match.params.id
    )
    let Price = '$' + (event.target.value * animal[0].cost).toFixed(2)
    this.setState({...this.state, Quantity: event.target.value, Price})
  }

  checkIfAnimalIsAlreadyInCart() {
    return this.props.cart.filter(
      CurrentAnimal => CurrentAnimal.animalId == this.props.match.params.id
    ).length
  }

  addToCart(animal) {
    let user = this.props.user
    let quantity = this.state.Quantity
    this.props.addAnimalToCart(animal, user, quantity)
  }

  updateCart(animal) {
    let user = this.props.user
    let quantity = this.state.Quantity
    this.props.updateAnimalInCart(animal, user, quantity)
  }

  addToCartButtonFunction(animal) {
    if (this.state.Quantity > 0) {
      if (this.checkIfAnimalIsAlreadyInCart()) {
        this.updateCart(animal)
      } else {
        this.addToCart(animal)
      }
    } else {
      console.log('Quantity cannot be 0')
    }
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
                    <Button
                      onClick={() => {
                        this.addToCartButtonFunction(animal[0])
                      }}
                    >
                      ADD TO CART
                    </Button>
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
  addAnimalToCart: (animal, user, quantity) =>
    dispatch(addAnimalToCart(animal, user, quantity)),
  updateAnimalInCart: (animal, user, quantity) =>
    dispatch(updateAnimalInCart(animal, user, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnimal)
