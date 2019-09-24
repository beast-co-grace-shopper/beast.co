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
class Users extends Component {
  componentDidMount() {}

  render() {
    return ''
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapState, mapDispatchToProps)(Users)
