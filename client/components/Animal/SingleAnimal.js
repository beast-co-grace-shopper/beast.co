import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import AnimalReview from './AnimalReview'
import {getReviewByAnimalId} from '../../store'
// import StarRatings from './react-star-ratings';

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
      alreadyInCart: false,
      clicked: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.reviewSubmit = this.reviewSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getReviewByAnimalId(this.props.match.params.id)
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

    const singleAnimal = this.props.animals.filter(
      CurrentAnimal => CurrentAnimal.id == this.props.match.params.id
    )

    const newReview = {
      title: this.state.title,
      description: this.state.description,
      rating: this.state.rating,
      animalId: singleAnimal[0].id,
      userId: this.props.user.id
    }

    this.props.postReview(newReview)
  }

  //this.props.user returns the user info

  render() {
    let animal = this.props.animals.filter(
      CurrentAnimal => CurrentAnimal.id == this.props.match.params.id
    )

    const reviewArr = this.props.reviews.reviews

    let sum = reviewArr.reduce(function(total, review) {
      return total + Number(review.rating)
    }, 0)

    let average = sum / reviewArr.length

    console.log(average)

    let reviewForm = (
      <AnimalReview
        animal={animal[0]}
        handleChange={this.handleChange}
        reviewSubmit={this.reviewSubmit}
      />
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

                <Row>
                  <div>Average Customer Rating:</div>
                  <div>{average.toFixed(2)}</div>
                </Row>

                <Row>
                  {this.props.user.id ? (
                    <div style={{display: 'inline-block'}}>
                      <div onClick={() => this.handleClick()}>
                        {this.state.clicked ? reviewForm : `Leave Review`}
                      </div>
                    </div>
                  ) : (
                    <div>Register to Leave a Review</div>
                  )}
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
    user: state.user,
    reviews: state.reviews
  }
}

const mapDispatchToProps = dispatch => ({
  addAnimalToCart: (animal, user, quantity) =>
    dispatch(addAnimalToCart(animal, user, quantity)),
  updateAnimalInCart: (animal, user, quantity) =>
    dispatch(updateAnimalInCart(animal, user, quantity)),
  getReviewByAnimalId: id => dispatch(getReviewByAnimalId(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnimal)
