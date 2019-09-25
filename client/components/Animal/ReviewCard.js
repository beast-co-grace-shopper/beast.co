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
    return (
      <Container className="card mt-3 mb-3">
        <Row style={{background: '#F7FEF6'}}>
          <Col className="ml-3 mb-2">
            <Row>
              <strong>{this.props.review.title}</strong>&emsp;
              <StarRatingComponent
                name={this.props.review.id}
                value={this.props.review.rating}
                starCount={5}
              />
            </Row>
            <Row>{this.props.review.description}</Row>
            <Row />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReviewCard
