import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import AnimalCard from '../animals/AnimalCard'
import {fetchUserCart} from '../../store/'

class Cart extends Component {
  componentDidMount() {
    const user = this.props.user
    this.props.fetchUserCart(user)
  }

  render() {
    const animals = this.props.cart.map(function(cartItem) {
      return cartItem.animal
    })

    const address = this.props.user.address
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
            </Col>
            <Col className="order-details">
              <h1>Order Details</h1>
              <Row>
                <h2>Shipping Address</h2>
                <h3>{address}</h3>
              </Row>
              <Row>
                <Form>
                  <Form.Group>
                    <Form.Label>Select Shipping Option</Form.Label>
                    <Form.Check
                      type="radio"
                      label="Standard Shipping: $500.00"
                      name="Shipping"
                    />
                    <Form.Check
                      type="radio"
                      label="Express Shipping: $1,000.00"
                      name="Shipping"
                    />
                    <Form.Check
                      type="radio"
                      label="Overnight Shipping: $5,000.00"
                      name="Shipping"
                    />
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <h2>Order Summary</h2>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchUserCart: user => dispatch(fetchUserCart(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
