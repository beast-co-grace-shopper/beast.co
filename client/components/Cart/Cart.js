import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import AnimalCard from '../animals/AnimalCard'
import {fetchUserCart} from '../../store/'
import {AddressForm, AddressCard} from '../'

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
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

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

                {address ? <AddressCard /> : <AddressForm />}
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
                        value={500.0}
                      />
                      <br />
                      <Form.Check
                        type="radio"
                        id="Express"
                        label="Express: $1,000.00"
                        name="Shipping"
                        onChange={this.handleChange}
                        value={1000.0}
                      />
                      <br />
                      <Form.Check
                        type="radio"
                        id="Overnight"
                        label="Overnight: $5,000.00"
                        name="Shipping"
                        onChange={this.handleChange}
                        value={5000.0}
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
                    <strong>Grand Total: </strong>${tax
                      ? this.state.Shipping + cartCost + tax
                      : this.state.Shipping + cartCost}
                  </p>
                </div>
              </div>

              <br />
              <br />

              <a href="#" className="btn btn-primary">
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
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchUserCart: user => dispatch(fetchUserCart(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
