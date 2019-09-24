/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import AnimalCartCard from '../Animal/AnimalCartCard'
import {fetchUserCart, submitCartOrder} from '../../store/'

class Confirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const order = this.props.order

    const confirmationNumber = order.id

    const cart = this.props.order.cart

    let orderArray

    if (cart) {
      orderArray = cart.map(function(el) {
        return {
          key: el.id,
          item: `${el.animal.name} x ${el.quantity}`
        }
      })
    }

    return (
      <div>
        <div>
          <p>
            <br />
          </p>
        </div>
        <Container>
          <Jumbotron>
            <Row>
              <Col xs={8}>
                <Row>
                  <Col>
                    <h1>Your order is on the way!</h1>
                    <div>
                      <p />
                    </div>
                    <h4>Confirmation Number: {confirmationNumber}</h4>
                    <div>
                      <p />
                    </div>
                    <h4>Order Summary: </h4>
                    <div>
                      <p />
                    </div>
                  </Col>
                </Row>

                <Row className="card">
                  <Row>
                    <Col>
                      <h5>Shipping</h5>
                      <div>
                        <strong>Name: </strong>
                        {order.firstName} {order.lastName}
                      </div>
                      <div>
                        <strong>Address: </strong>
                        {order.address}
                      </div>
                      <div>
                        <strong>Address 2: </strong>
                        {order.address2}
                      </div>
                      <div>
                        <strong>City: </strong>
                        {order.city}
                      </div>
                      <div>
                        <strong>State: </strong>
                        {order.state}, <strong>Zip: </strong>
                        {order.zip}
                      </div>
                    </Col>
                    <Col>
                      <h5>Purchase Details: </h5>
                      <ul className="list-unstyled">
                        {orderArray
                          ? orderArray.map(el => (
                              <li key={el.key}>{el.item}</li>
                            ))
                          : ''}
                      </ul>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <Col>
                    <div>
                      <p />
                    </div>
                    <h5>Confirmation email sent to: {order.email}</h5>
                  </Col>
                </Row>
              </Col>

              <Col>
                <Image
                  src="/images/beastCo.GIF"
                  style={{
                    height: '300px',
                    width: '300px',
                    margin: 'auto',
                    display: 'block'
                  }}
                  fluid
                  className="img-responsive center-block"
                />
              </Col>
            </Row>
          </Jumbotron>

          {/* <Col>
            CONFIRMATION PAGE
            <p>Order: {this.props.order.address}</p>
          </Col> */}
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.orders.order
})

export default connect(mapStateToProps)(Confirmation)
