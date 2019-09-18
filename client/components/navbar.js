import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
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
  }

  handleSearch = event => {
    event.preventDefault()
    console.log('trying to search for: ', event.target.searchFor.value)
    this.props.searchForAnimals(event.target.searchFor.value)
  }

  handleCategorize = eventKey => {
    console.log('got category request. eventKey: ', eventKey)
    this.props.filterAnimalCategories(eventKey)
  }

  render() {
    const categories = this.props.categories

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home">beast.co LOGO</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link href="/home">HOME</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/animals">ANIMALS</Nav.Link>
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
              <Nav.Link href="#" onSelect={this.props.handleClick}>
                LOGOUT
              </Nav.Link>
            </Nav.Item>
          ) : (
            <div>
              <Nav.Item>
                <Nav.Link href="/login">LOGIN</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/signup">SIGN UP</Nav.Link>
              </Nav.Item>
            </div>
          )}
        </Nav>
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

export default connect(mapState, mapDispatch)(Navigation)

/**
 * PROP TYPES
 */
// Navigation.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
