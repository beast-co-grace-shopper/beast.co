import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Row>
      <Col>
        <div className="card">
          <h5 className="card-header card-text">{displayName} With Google</h5>
          <a href="/auth/google">
            <Button>{displayName} with Google</Button>
          </a>
        </div>
      </Col>
      <Col>
        <div className="card">
          <h5 className="card-header card-text">{displayName} With Beast.Co</h5>
          <Container className="address-form">
            <Form onSubmit={handleSubmit} name={name}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Row>
                    <Col>
                      <Form.Label>Email</Form.Label>
                    </Col>
                    <Col>* Required Field</Col>
                  </Row>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword1">
                  <Row>
                    <Col>
                      <Form.Label>Password</Form.Label>
                    </Col>
                    <Col>* Required Field</Col>
                  </Row>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                  />
                </Form.Group>
              </Form.Row>

              {displayName === 'Login' ? (
                ''
              ) : (
                <div>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control placeholder="First Name" name="firstName" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control placeholder="Last Name" name="lastName" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" name="address" />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control name="city" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>State</Form.Label>
                      <Form.Control as="select" name="state">
                        <option>Choose...</option>
                        <option>...</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control name="zip" />
                    </Form.Group>
                  </Form.Row>
                </div>
              )}

              <Form.Row>
                <Button type="submit">{displayName}</Button>
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
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 * 
 * 
 * 
 * 
 * 
 


    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>

 */

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value

      let address = ''
      let city = ''
      let state = ''
      let zip = ''
      let firstName = ''
      let lastName = ''

      if (evt.target.address) {
        address = evt.target.address.value
        city = evt.target.city.value
        state = evt.target.state.value
        zip = evt.target.zip.value
        firstName = evt.target.firstName.value
        lastName = evt.target.lastName.value
      }

      dispatch(
        auth(
          email,
          password,
          formName,
          address,
          city,
          state,
          zip,
          firstName,
          lastName
        )
      )
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
