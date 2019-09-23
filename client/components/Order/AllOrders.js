import React, {Component} from 'react'
import {connect} from 'react-redux'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import OrderRow from './OrderRow'

class AllOrders extends Component {
  render() {
    let orders = this.props.orders

    return (
      <Container>
        <Row>
          <Col>
            <h1>Your Orders</h1>
            {orders && orders.length
              ? orders.map(order => <OrderRow key={order.id} order={order} />)
              : 'You have not ordered any items in the past'}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders.allUserOrders
})

export default connect(mapStateToProps)(AllOrders)
