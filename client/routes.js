import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  AllAnimals,
  AllOrders,
  Cart,
  Confirmation,
  Login,
  Signup,
  SingleAnimal,
  UserHome
} from './components'
import {me, fetchAnimals} from './store'
import {fetchUserCart} from './store/actions/cart-actions'

//replace cart with all animals

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props) {
    super(props)
    this.CartUpdated = false
  }

  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchAnimals()
  }

  updateCart = user => {
    if (user.id) {
      //console.log("getting cart");
      if (!this.CartUpdated) {
        this.props.fetchUserCart(user)
      }
    }
  }

  updateGuestCart = user => {
    //console.log(user);
    this.props.fetchUserCart({id: user})
    //console.log(this.props);
  }

  render() {
    const {isLoggedIn} = this.props

    if (this.props.user.id && !this.UpdatedCart) {
      this.updateCart(this.props.user)
      this.UpdatedCart = true
    } else if (!this.UpdatedCart && this.props.animals.length > 0) {
      this.updateGuestCart('guest')
      this.UpdatedCart = true
    }

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/animals"
          render={routeProps => (
            <AllAnimals {...routeProps} animals={this.props.animals} />
          )}
        />
        <Route path="/cart" component={Cart} />
        <Route path="/confirmation" component={Confirmation} />
        <Route path="/animal/:id" component={SingleAnimal} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/users/:userId/orders" component={AllOrders} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
  // Otherwise, state.user will be an empty object, and state.user.id will be falsey
  isLoggedIn: !!state.user.id,
  user: state.user,
  animals: state.animals,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  fetchAnimals: () => dispatch(fetchAnimals()),
  fetchUserCart: userId => dispatch(fetchUserCart(userId))
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
