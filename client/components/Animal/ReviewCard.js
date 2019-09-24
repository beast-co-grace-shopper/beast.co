import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import StarRatingComponent from 'react-star-rating-component'

//title, description, rating

class ReviewCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    console.log('this is review card,', this.props.review.user)

    return (
      <Container className="card mt-3">
        <Row>
          <Col className="ml-3">
            <Row>Title: {this.props.review.title}</Row>
            <Row>Description: {this.props.review.description}</Row>
            <Row>
              Rating:{' '}
              <StarRatingComponent
                name={this.props.review.id}
                value={this.props.review.rating}
                starCount={5}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReviewCard
