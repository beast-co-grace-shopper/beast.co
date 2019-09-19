import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import SingleAnimal from './components/animals/SingleAnimal'
import {Login, Signup, UserHome, AllAnimals, Cart} from './components'
import {me, fetchAnimals} from './store'

//replace cart with all animals

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchAnimals()
  }

  render() {
    const {isLoggedIn} = this.props

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
        <Route path="/animal/:id" component={SingleAnimal} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/cart" component={Cart} />
            <Route path="/animals" component={AllAnimals} />
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
  animals: state.animals
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me()),
  fetchAnimals: () => dispatch(fetchAnimals())
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
