import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import {update} from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const user = props.user

  let handleSubmit = evt => {
    evt.preventDefault()
    const formName = 'updateUserInfo'
    const email = user.email

    let address = ''
    let city = ''
    let state = ''
    let zip = ''
    let firstName = ''
    let lastName = ''

    firstName = evt.target.firstName.value
    lastName = evt.target.lastName.value

    if (evt.target.address.value.length > 0) {
      address = evt.target.address.value
      city = evt.target.city.value
      state = evt.target.state.value
      zip = evt.target.zip.value
    }

    let info = {
      formName,
      email,
      address,
      city,
      state,
      zip,
      firstName,
      lastName
    }

    props.update(info)
  }

  return (
    <Row>
      <Col />
      <Col>
        <div className="card">
          <h5 className="card-header card-text">Welcome, {user.email}!</h5>
          <h5 className="card-header card-text">Update Your Info:</h5>
          <Container className="address-form">
            <Form name="updateUserInfo" onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control placeholder={user.firstName} name="firstName" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control placeholder={user.lastName} name="lastName" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder={user.address} name="address" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control name="city" placeholder={user.city} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select" name="state">
                    {' '}
                    placeholder={user.state}
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control name="zip" placeholder={user.zip} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Button type="submit">Update</Button>
              </Form.Row>
            </Form>
          </Container>
        </div>
      </Col>
      <Col />
    </Row>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  update: user => dispatch(update(user))
})

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
