import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import AnimalCard from '../animals/AnimalCard'
import {fetchUserCart, fetchAnimals} from '../../store/'

class Cart extends Component {
  componentDidMount() {
    const user = this.props.user
    console.log('user props ', user)
    this.props.fetchUserCart(user)
    this.props.fetchAnimals()
  }

  render() {
    const animals = this.props.cart.map(function(cartItem) {
      return cartItem.animal
    })

    // const animals = this.props.animals || []

    return (
      <div>
        <Container className="cart-container">
          <Row>
            <Col className="shopping-cart">
              <h1>Shopping Cart</h1>
              {animals && animals.length
                ? animals.map(animal => (
                    <AnimalCard key={animal.id} animal={animal} />
                  ))
                : 'Shopping Cart is Empty!'}
              {/* {animals && animals.length
                        ? animals.map(animal => (
                        <AnimalCard key={animal.id} animal={animal} />
                        ))
                        : 'There are no animals in the database...'} */}
            </Col>
            <Col className="order-details">
              <h1>Order Details</h1>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user,
  animals: state.animals
})

const mapDispatchToProps = dispatch => ({
  fetchUserCart: user => dispatch(fetchUserCart(user)),
  fetchAnimals: () => dispatch(fetchAnimals())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
