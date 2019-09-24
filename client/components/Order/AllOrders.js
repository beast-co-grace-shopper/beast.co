import React, {Component} from 'react'
import {connect} from 'react-redux'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import OrderRow from './OrderRow'
import {fetchOrdersForUser} from '../../store'

class AllOrders extends Component {
  componentDidMount() {
    this.props.fetchOrdersForUser(this.props.loggedInUser)
  }

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
  loggedInUser: state.user.id,
  orders: state.orders.allUserOrders
})

const mapDispatchToProps = dispatch => ({
  fetchOrdersForUser: userId => dispatch(fetchOrdersForUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
