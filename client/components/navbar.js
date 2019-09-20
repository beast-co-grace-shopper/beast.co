import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'

import {
  logout,
  fetchCategories,
  filterAnimalCategories,
  searchForAnimals
} from '../store'

class Navigation extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    console.log('Navigation: my props are: ', this.props)
  }

  handleSearch = event => {
    event.preventDefault()
    console.log('trying to search for: ', event.target.searchFor.value)
    this.props.searchForAnimals(event.target.searchFor.value)
    this.props.history.push('/animals')
  }

  handleCategorize = eventKey => {
    console.log('got category request. eventKey: ', eventKey)
    this.props.filterAnimalCategories(eventKey)
  }

  render() {
    const categories = this.props.categories

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <LinkContainer to="/home">
            <Navbar.Brand>
              <img
                src="/images/beastCo.png"
                width="60"
                height="50"
                className="d-inline-block align-center"
                alt="beast.co logo"
              />
              {'beast.co'}
            </Navbar.Brand>
          </LinkContainer>
          <Nav fill className="justify-content-end">
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

            <Nav.Item>
              <Dropdown name="category" onSelect={this.handleCategorize}>
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
                <FormControl
                  className="mr-sm-2"
                  name="searchFor"
                  placeholder="Search"
                  type="text"
                />
                <Button type="submit" variant="outline-info">
                  Search
                </Button>
              </Form>
            </Nav.Item>

            {this.props.isLoggedIn ? (
              <Nav.Item>
                <LinkContainer to="#">
                  <Nav.Link onSelect={this.props.handleClick}>LOGOUT</Nav.Link>
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
        </Navbar>
        <Navbar bg="dark" variant="dark">
          <Nav fill className="justify-content-end">
            <Nav.Item>
              <Nav.Link>BIG</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>BIGGER</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </div>
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

export default connect(mapState, mapDispatch)(Navigation)

/**
 * PROP TYPES
 */
// Navigation.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
