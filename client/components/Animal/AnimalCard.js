import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import {getAverageRating} from '../../store/'

class AnimalCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Container className="card">
        <Row>
          <Col>
            <Image
              src={this.props.animal.photo}
              style={{height: '100px', width: '100px'}}
              fluid
            />
          </Col>
          <Col>
            <h1>{this.props.animal.name}</h1>
            <p>Price: ${this.props.animal.cost}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  averageRating: state.cart
})

const mapDispatchToProps = dispatch => ({
  getAverageRating: id => dispatch(getAverageRating(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnimalCard)
