import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {
  logout,
  fetchCategories,
  filterAnimalCategories,
  searchForAnimals
} from '../store'

class Navigation extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  handleSearch = event => {
    const searchString = event.target.searchFor.value
    event.preventDefault()
    // this.props.searchForAnimals(searchString)
    this.props.history.push(`/animals?search=${searchString}`)
  }

  handleCategorize = eventKey => {
    // this.props.filterAnimalCategories(eventKey)
    this.props.history.push(`/animals?category=${eventKey}`)
  }

  render() {
    const categories = this.props.categories

    return (
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Row>
            <Col sm="4">
              <LinkContainer to="/home">
                <Navbar.Brand>
                  <img
                    src="/images/beastCo.jpg"
                    width="100"
                    height="90"
                    className="d-inline-block align-center"
                    alt="beast.co logo"
                  />
                  {'beast.co'}
                </Navbar.Brand>
              </LinkContainer>
            </Col>

            <Col sm="8">
              <Row>
                <Col>
                  <Nav fill className="justify-content-left">
                    <Nav.Item>
                      <Dropdown
                        name="category"
                        onSelect={this.handleCategorize}
                      >
                        <Dropdown.Toggle variant="primary">All</Dropdown.Toggle>
                        <Dropdown.Menu>
                          {categories &&
                            categories.map(category => (
                              <Dropdown.Item
                                key={category.id}
                                eventKey={category.category}
                              >
                                {category.category}
                              </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Nav.Item>

                    <Nav.Item>
                      <Form onSubmit={this.handleSearch} inline>
                        <Form.Row>
                          <Col>
                            <FormControl
                              name="searchFor"
                              placeholder="Search"
                              type="text"
                            />
                          </Col>

                          <Col>
                            <Button type="submit" variant="outline-info">
                              Search
                            </Button>
                          </Col>
                        </Form.Row>
                      </Form>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Nav className="justify-content-start">
                    <Nav.Item>
                      <LinkContainer to="/home">
                        <Nav.Link>HOME</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>

                    <Nav.Item>
                      <LinkContainer to="/animals">
                        <Nav.Link>ANIMALS</Nav.Link>
                      </LinkContainer>
                    </Nav.Item>
                    {this.props.isLoggedIn ? (
                      <Nav.Item>
                        <LinkContainer to="#">
                          <Nav.Link onSelect={this.props.handleClick}>
                            LOGOUT
                          </Nav.Link>
                        </LinkContainer>
                      </Nav.Item>
                    ) : (
                      <div>
                        <Nav.Item>
                          <LinkContainer to="/login">
                            <Nav.Link>LOGIN</Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                          <LinkContainer to="/signup">
                            <Nav.Link>SIGN UP</Nav.Link>
                          </LinkContainer>
                        </Nav.Item>
                      </div>
                    )}
                  </Nav>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Navbar>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  categories: state.categories
})

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout()),
  fetchCategories: () => dispatch(fetchCategories()),
  filterAnimalCategories: category =>
    dispatch(filterAnimalCategories(category)),
  searchForAnimals: animal => dispatch(searchForAnimals(animal))
})

export default withRouter(connect(mapState, mapDispatch)(Navigation))

/**
 * PROP TYPES
 */
// Navigation.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
