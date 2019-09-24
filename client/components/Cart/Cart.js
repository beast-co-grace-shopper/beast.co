/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {LinkContainer} from 'react-router-bootstrap'
import AnimalCartCard from '../Animal/AnimalCartCard'
import {fetchUserCart, submitCartOrder} from '../../store/'
import {AddressForm, AddressCard, CheckoutForm} from '../'
import {Elements, StripeProvider} from 'react-stripe-elements'
//const stripe = require('stripe')('sk_test_Ulh5c2JG4xYsAt3BnShNbuLE00Z8sTOwKk');

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Shipping: 0.0,
      email: this.props.user.email
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToken = this.handleToken.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleToken(token, address) {
    console.log({token, address})
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

    if (!registeredUser) {
      const checkoutUser = this.props.cart[0].user

      newOrder = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        address: this.state.address,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        deliveryType: shipType,
        userid: checkoutUser.id
      }
    }

    this.props.submitCartOrder(newOrder)
  }

  render() {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    let address

    if (this.props.isLoggedIn) {
      address = this.props.user.address
    }

    const animals = this.props.cart.map(function(cartItem) {
      return cartItem.animal
    })

    let cartCost

    if (this.props.cart) {
      cartCost = this.props.cart
        .reduce(function(total, cartItem) {
          return Number(total + cartItem.animal.cost * cartItem.quantity)
        }, 0)
        .toFixed(2)
    }

    let tax = ((cartCost + this.state.Shipping) * 0.15).toFixed(2)

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
                          <AnimalCartCard
                            animal={animal}
                            cart={this.props.cart}
                          />
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
                    <strong>Cart Total:</strong> {formatter.format(cartCost)}
                  </p>
                  <p>
                    <strong>Shipping Cost: </strong>
                    {this.state.Shipping
                      ? formatter.format(this.state.Shipping)
                      : formatter.format(0)}
                  </p>
                  <p>
                    <strong>Tax: </strong>
                    {tax ? formatter.format(tax) : 0.0}
                  </p>
                  <p>
                    <strong>Grand Total: </strong>
                    {formatter.format(
                      Number(this.state.Shipping) +
                        Number(cartCost) +
                        Number(tax)
                    )}
                  </p>
                </div>
              </div>
              {/* formatter.format(2500) */}

              <br />
              <br />
              {/* 
              <LinkContainer to="/confirmation">                
              <a
                  href="#"
                  className="btn btn-primary"
                  onClick={() => this.handleSubmit()}
                >
                  Submit Order
                </a>
              </LinkContainer> */}

              {/* <div>
                <StripeCheckout 
                onClick={() => this.handleSubmit()}
                stripeKey='pk_test_KdBW0S7vTyDxnkZoUO4JgOtq007yjuvILb'
                token={this.handleToken}
                amount={Number(Number(this.state.Shipping) + Number(cartCost) + Number(tax))*100}
                />
              </div> */}

              <div>
                <StripeProvider apiKey="pk_test_KdBW0S7vTyDxnkZoUO4JgOtq007yjuvILb">
                  <div className="example">
                    <Elements>
                      <CheckoutForm
                        cartSubmit={this.handleSubmit}
                        amount={
                          Number(
                            Number(this.state.Shipping) +
                              Number(cartCost) +
                              Number(tax)
                          ) * 100
                        }
                        email={this.state.email}
                        name="test"
                      />
                    </Elements>
                  </div>
                </StripeProvider>
              </div>

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
  cart: state.cart,
  isLoggedIn: !!state.user.id,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchUserCart: user => dispatch(fetchUserCart(user)),
  submitCartOrder: newOrder => dispatch(submitCartOrder(newOrder))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
