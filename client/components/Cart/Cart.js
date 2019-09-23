import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import AnimalCard from '../Animal/AnimalCard'
import {fetchUserCart, submitCartOrder} from '../../store/'
import {AddressForm, AddressCard} from '../'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    let newOrder
    const registeredUser = this.props.cart[0].user.address
    let shipType

    if (this.state.Shipping === 500) {
      shipType = 'Standard'
    }
    if (this.state.Shipping === 1000) {
      shipType = 'Express'
    }
    if (this.state.Shipping === 5000) {
      shipType = 'Overnight'
    }

    if (registeredUser) {
      const checkoutUser = this.props.cart[0].user

      newOrder = {
        firstName: checkoutUser.firstName,
        lastName: checkoutUser.lastName,
        email: checkoutUser.email,
        address: checkoutUser.address,
        address2: checkoutUser.address2,
        city: checkoutUser.city,
        state: checkoutUser.state,
        zip: checkoutUser.zip,
        deliveryType: shipType,
        userid: checkoutUser.id
      }
    }

    this.props.submitCartOrder(newOrder)
  }

  render() {
    const firstCartItem = this.props.cart[0]

    let address

    if (firstCartItem) {
      console.log(firstCartItem.user.address)
      address = firstCartItem.user.address
    }

    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    const animals = this.props.cart.map(function(cartItem) {
      return cartItem.animal
    })

    const cartCost = this.props.cart.reduce(function(total, cartItem) {
      return Number(total + cartItem.animal.cost * cartItem.quantity)
    }, 0)

    const tax = (cartCost + this.state.Shipping) * 0.15

    return (
      <div>
        <Container className="cart-container">
          {/* row ensures 2 columns side by side */}
          <Row>
            <Col className="card-column">
              <h1 className="card-title">Shopping Cart</h1>
              <Row>
                <Col className="card-column">
                  {animals && animals.length
                    ? animals.map(animal => (
                        <div key={animal.id}>
                          <AnimalCard animal={animal} />
                          <br />
                        </div>
                      ))
                    : 'Shopping Cart is Empty!'}
                </Col>
              </Row>
            </Col>

            <Col className="card-column">
              <h1>Order Details</h1>

              <div className="card">
                <h5 className="card-header card-text">Shipping Address</h5>

                {address ? (
                  <AddressCard />
                ) : (
                  <AddressForm handleChange={this.handleChange} />
                )}
              </div>

              <br />
              <div className="card">
                <Form>
                  <Form.Group>
                    <h5 className="card-header card-text">
                      Select Shipping Option
                    </h5>
                    <div className="card-body">
                      <Form.Check
                        type="radio"
                        id="Standard"
                        label="Standard: $500.00"
                        name="Shipping"
                        onChange={this.handleChange}
                        value={500}
                      />
                      <br />
                      <Form.Check
                        type="radio"
                        id="Express"
                        label="Express: $1,000.00"
                        name="Shipping"
                        onChange={this.handleChange}
                        value={1000}
                      />
                      <br />
                      <Form.Check
                        type="radio"
                        id="Overnight"
                        label="Overnight: $5,000.00"
                        name="Shipping"
                        onChange={this.handleChange}
                        value={5000}
                      />
                    </div>
                  </Form.Group>
                </Form>
              </div>

              <br />

              <div className="card">
                <h5 className="card-header card-text">Order Summary</h5>
                <div className="card-body">
                  <p>
                    <strong>Cart Total:</strong> ${cartCost}
                  </p>
                  <p>
                    <strong>Shipping Cost: </strong>${this.state.Shipping
                      ? this.state.Shipping
                      : 0.0}
                  </p>
                  <p>
                    <strong>Tax: </strong>${tax ? tax : 0.0}
                  </p>
                  <p>
                    <strong>Grand Total: </strong>${(
                      Number(this.state.Shipping) +
                      Number(cartCost) +
                      Number(tax)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              <br />
              <br />

              <a
                href="#"
                className="btn btn-primary"
                onClick={() => this.handleSubmit()}
              >
                Submit Order
              </a>

              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  fetchUserCart: user => dispatch(fetchUserCart(user)),
  submitCartOrder: newOrder => dispatch(submitCartOrder(newOrder))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
