import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import AnimalCard from '../animals/AnimalCard'
import {fetchUserCart} from '../../store/'
import {AddressForm} from '../'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    const user = this.props.user
    this.props.fetchUserCart(user)
  }

  render() {
    const animals = this.props.cart.map(function(cartItem) {
      return cartItem.animal
    })

    const address = this.props.user.address
    // const address = 'Hello'

    const cartCost = this.props.cart.reduce(function(total, cartItem) {
      return total + cartItem.animal.cost
    }, 0)

    const tax = cartCost * this.state.Shipping * 0.15

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
              <Row className="card">
                <h2>Shipping Address</h2>

                {address ? address : <AddressForm />}
              </Row>
              <Row className="card">
                <Form>
                  <Form.Group>
                    <Form.Label>Select Shipping Option</Form.Label>
                    <Form.Check
                      type="radio"
                      id="Standard"
                      label="Standard: $500.00"
                      name="Shipping"
                      onChange={this.handleChange}
                      value={500.0}
                    />
                    <Form.Check
                      type="radio"
                      id="Express"
                      label="Express: $1,000.00"
                      name="Shipping"
                      onChange={this.handleChange}
                      value={1000.0}
                    />
                    <Form.Check
                      type="radio"
                      id="Overnight"
                      label="Overnight: $5,000.00"
                      name="Shipping"
                      onChange={this.handleChange}
                      value={5000.0}
                    />
                  </Form.Group>
                </Form>
              </Row>
              <Row className="card">
                <h2>Order Summary</h2>
                <Row>Cart Total: ${cartCost}</Row>
                <Row>
                  Shipping Cost: ${this.state.Shipping
                    ? this.state.Shipping
                    : 0.0}
                </Row>
                <Row>Tax: ${tax ? tax : 0.0}</Row>
                <Row>
                  Grand Total: ${tax
                    ? this.state.Shipping + cartCost + tax
                    : this.state.Shipping + cartCost}
                </Row>
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
