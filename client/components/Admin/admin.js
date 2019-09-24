import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import {fetchAllOrders} from '../../store'
import {fetchUsersInfo} from '../../store/user'
import OrderRow from '../Order/OrderRow'
import AnimalCard from '../Animal/AnimalCard'

/**
 * COMPONENT
 */
class Admin extends Component {
  componentDidMount() {
    this.props.fetchAllOrders()
    this.props.fetchUsersInfo()
  }

  render() {
    let orders = this.props.allOrders
    return (
      <Row>
        <Col>
          <div className="card">
            <h5 className="card-header card-text">Manage Orders</h5>
            {orders && orders.length
              ? orders.map(order => <OrderRow key={order.id} order={order} />)
              : 'There Are No Orders To Manage Yet!'}
            <Button>Save</Button>
          </div>
        </Col>
        <Col>
          <div className="card">
            <h5 className="card-header card-text">Manage Accounts</h5>
            <Button>Save</Button>
          </div>
        </Col>
        <Col>
          <div className="card">
            <h5 className="card-header card-text">Manage Products</h5>
            {this.props.animals && this.props.animals.length
              ? this.props.animals.map(animal => (
                  <AnimalCard animal={animal} key={animal.id} />
                ))
              : 'There are no animals in the database...'}
            <Button>Save</Button>
          </div>
        </Col>
      </Row>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allOrders: state.orders.allOrders,
    animals: state.animals
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchAllOrders()),
  fetchUsersInfo: () => dispatch(fetchUsersInfo())
})

export default connect(mapState, mapDispatchToProps)(Admin)
