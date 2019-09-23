import React, {Component} from 'react'
import {connect} from 'react-redux'

class AllOrders extends Component {
  render() {
    console.log(this.props.orders)
    return <h1>Your Orders</h1>
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

export default connect(mapStateToProps)(AllOrders)
