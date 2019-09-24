import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import {fetchUsersInfo, deleteUser} from '../../store'

/**
 * COMPONENT
 */
class Users extends Component {
  componentDidMount() {
    this.props.fetchUsersInfo()
  }

  handleDelete = userId => {
    this.props.deleteUser(userId)
  }

  render() {
    const users = this.props.users

    return (
      <Container>
        <Row>
          <h1 className="text-secondary">All Users</h1>
        </Row>
        {users && users.length ? (
          users.map(user => (
            <Row key={user.id}>
              <Col sm={1}>
                <strong>{user.id}</strong>
              </Col>
              <Col sm={3}>{user.email}</Col>
              <Col sm={2}>{`${user.lastName}, ${user.firstName}`}</Col>
              <Col sm={3}>
                <ul className="list-unstyled">
                  <li>{user.address}</li>
                  <li>{user.address2}</li>
                  <li>{`${user.city}, ${user.state} ${user.zip}`}</li>
                </ul>
              </Col>
              <Col sm={3}>
                <Button onClick={() => this.handleDelete(user.id)} size="sm">
                  DELETE
                </Button>
              </Col>
            </Row>
          ))
        ) : (
          <Row>
            <Col>NOTE: no user data...</Col>
          </Row>
        )}
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  deleteUser: userId => dispatch(deleteUser(userId)),
  fetchUsersInfo: () => dispatch(fetchUsersInfo())
})

export default connect(mapState, mapDispatchToProps)(Users)
