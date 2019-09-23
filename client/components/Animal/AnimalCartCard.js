import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import AnimalReview from './AnimalReview'
import {postReview} from '../../store'

class AnimalCartCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.reviewSubmit = this.reviewSubmit.bind(this)
  }

  handleClick() {
    this.setState({
      clicked: true
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  reviewSubmit() {
    //create review object
    const newReview = {
      title: this.state.title,
      description: this.state.description,
      rating: this.state.rating,
      animalId: this.props.animal.id,
      userId: this.props.cart[0].userId
    }

    this.props.postReview(newReview)
  }

  render() {
    const cart = this.props.cart
    console.log('this is cart', cart)
    const animal = this.props.animal
    let quantity = 0

    cart.forEach(function(cartItem) {
      if (cartItem.animal.name === animal.name) {
        quantity += cartItem.quantity
      }
    })

    let reviewForm = (
      <AnimalReview
        animal={this.props.animal}
        handleChange={this.handleChange}
        reviewSubmit={this.reviewSubmit}
      />
    )

    return (
      <Container className="card">
        <Row>
          <Col className="card" style={{border: 'none'}}>
            <Image
              src={this.props.animal.photo}
              style={{
                height: '150px',
                width: '150px',
                margin: 'auto',
                display: 'block'
              }}
              fluid
              roundedCircle
              className="img-responsive center-block"
            />
          </Col>
          <Col>
            <Row>
              <div className="card" style={{border: 'none'}}>
                <p />
                <h4 className="card-title">{this.props.animal.name}</h4>
                <div>
                  <strong>Price: </strong>${this.props.animal.cost}
                </div>
                <div>{quantity > 0 ? `Quantity: ${quantity}` : ' '}</div>
              </div>
            </Row>

            <Row>
              <p />
              <p />
            </Row>

            <Row>
              <div style={{display: 'inline-block'}}>
                <div onClick={() => this.handleClick()}>
                  {this.state.clicked ? reviewForm : `Leave Review`}
                </div>
                <div>{this.state.clicked ? ' ' : 'Delete Item(s)'}</div>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  postReview: review => dispatch(postReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnimalCartCard)
