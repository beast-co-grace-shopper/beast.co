import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Figure from 'react-bootstrap/Figure'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faShoppingCart} from '@fortawesome/free-solid-svg-icons'

import {
  logout,
  fetchCategories,
  filterAnimalCategories,
  searchForAnimals
} from '../store'

const DEFAULT_CATEGORY_TITLE = 'All Animals'

export class Navigation extends Component {
  constructor() {
    super()

    this.state = {
      categoryTitle: DEFAULT_CATEGORY_TITLE,
      searchString: ''
    }
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleSearch = event => {
    event.preventDefault()
    this.props.history.push(`/animals?search=${this.state.searchString}`)
    this.setState({
      categoryTitle: DEFAULT_CATEGORY_TITLE
    })
  }

  handleCategorize = eventKey => {
    this.setState({
      categoryTitle: eventKey,
      searchString: ''
    })
    this.props.history.push(`/animals?category=${eventKey}`)
  }

  handleSearchEntry = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleControlMenu = eventKey => {
    switch (eventKey) {
      case 'orders':
        this.props.history.push(`/users/${this.props.user.id}/orders`)
        break

      case 'signout':
        this.props.handleLogout()
        break

      case 'signin':
        this.props.history.push('/login')
        break

      case 'signup':
        this.props.history.push('/signup')
        break

      case 'adminManageOrders':
        this.props.history.push('/admin/orders')
        break

      case 'adminManageProducts':
        this.props.history.push('/admin/products')
        break

      case 'adminManageUsers':
        this.props.history.push('/admin/users')
        break

      default:
        console.error('ERROR: invalid menu option selected: ', eventKey)
    }
  }

  render() {
    const categories = this.props.categories

    return (
      <React.Fragment>
        {/* branding and search controls... */}
        <Navbar className="pb-0" bg="dark" variant="dark">
          <LinkContainer to="/home">
            <Navbar.Brand className="py-0">
              <Figure className="d-flex align-items-center mb-0">
                <Figure.Image
                  alt="beast.co logo"
                  className="mb-0"
                  color="#fd7e14"
                  height={25}
                  src="/images/beastCo.png"
                  width={60}
                />
                <Figure.Caption
                  className="d-flex align-items-center pl-3 logo"
                  style={{fontSize: '1.5em', color: '#fd7e14'}}
                >
                  beast.co
                </Figure.Caption>
              </Figure>
            </Navbar.Brand>
          </LinkContainer>

          <DropdownButton
            className="ml-auto"
            id="nav-category"
            name="category"
            onSelect={this.handleCategorize}
            size="sm"
            title={this.state.categoryTitle}
            variant="success"
          >
            {categories &&
              categories.map(category => (
                <Dropdown.Item key={category.id} eventKey={category.category}>
                  {category.category}
                </Dropdown.Item>
              ))}
          </DropdownButton>

          <Form className="pl-2" inline onSubmit={this.handleSearch}>
            <InputGroup size="sm">
              <FormControl
                name="searchString"
                onChange={this.handleSearchEntry}
                placeholder="Search for animals..."
                type="text"
                value={this.state.searchString}
              />
              <InputGroup.Append>
                <Button type="submit" variant="outline-success">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Navbar>

        {/* site navigation... */}
        <Navbar className="pt-0" bg="dark" variant="dark">
          {/* main menu items... */}
          <Nav>
            <Nav.Item className="text-light font-weight-bold">
              {this.props.isLoggedIn
                ? `Hello, ${this.props.user.firstName || 'Mystery User'}`
                : 'Hello, Guest'}
            </Nav.Item>
          </Nav>

          <Nav className="border-right border-secondary ml-auto">
            <Nav.Item>
              <LinkContainer to="/animals">
                <Nav.Link>Our Zoo</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>

          {/* control menu items... */}
          <Nav className="ml-2">
            <Nav.Item>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FontAwesomeIcon
                    className="font-size-larger"
                    icon={faShoppingCart}
                  />
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <NavDropdown
              alignRight
              className="font-weight-bold"
              onSelect={this.handleControlMenu}
              title="Your Account"
            >
              {this.props.isLoggedIn ? (
                <div>
                  <NavDropdown.Item eventKey="account">
                    Your Account
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="orders">
                    Your Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="signout">
                    Sign Out
                  </NavDropdown.Item>
                  {this.props.user.isAdmin && (
                    <div>
                      <NavDropdown.Divider />
                      <NavDropdown.Item eventKey="adminManageOrders">
                        Admin: Manage Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="adminManageUsers">
                        Admin: Manage Accounts
                      </NavDropdown.Item>
                      <NavDropdown.Item eventKey="adminManageProducts">
                        Admin: Manage Products
                      </NavDropdown.Item>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <NavDropdown.Item eventKey="signin">Sign in</NavDropdown.Item>
                  <NavDropdown.Item eventKey="signup">Sign up</NavDropdown.Item>
                </div>
              )}
            </NavDropdown>
          </Nav>
        </Navbar>
      </React.Fragment>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  user: state.user,
  categories: state.categories
})

const mapDispatch = dispatch => ({
  handleLogout: () => dispatch(logout()),
  fetchCategories: () => dispatch(fetchCategories()),
  filterAnimalCategories: category =>
    dispatch(filterAnimalCategories(category)),
  searchForAnimals: animal => dispatch(searchForAnimals(animal))
})

export default withRouter(connect(mapState, mapDispatch)(Navigation))
