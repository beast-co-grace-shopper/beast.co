/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import AnimalCartCard from '../Animal/AnimalCartCard'
import {fetchUserCart, submitCartOrder} from '../../store/'

class Confirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Container>
          <Col>
            CONFIRMATION PAGE
            <p>Order: {this.props.order}</p>
          </Col>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order
})

export default connect(mapStateToProps)(Confirmation)
