import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import {fetchAllOrders} from '../../store'
import OrderRow from '../Order/OrderRow'

/**
 * COMPONENT
 */
class Orders extends Component {
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    let orders = this.props.allOrders
    return (
      <div className="card">
        <h5 className="card-header card-text">Manage Orders </h5>
        <Button className="ml-auto">Save</Button>
        {orders && orders.length
          ? orders.map(order => <OrderRow key={order.id} order={order} />)
          : 'There Are No Orders To Manage Yet!'}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allOrders: state.orders.allOrders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchAllOrders())
})

export default connect(mapState, mapDispatchToProps)(Orders)
