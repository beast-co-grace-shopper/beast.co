import React, {Component} from 'react'
import {connect} from 'react-redux'

class AddressCard extends Component {
  render() {
    const user = this.props.user
    const first = user.firstName
    const last = user.lastName
    const address = user.address
    const addressTwo = user.address2
    const city = user.city
    const state = user.state
    const zip = user.zip

    return (
      <div className="card-body">
        <div>
          <strong>Name: </strong> {first} {last}
        </div>
        <div>
          <strong>Address: </strong>
          {address}
        </div>
        <div>
          <strong>Address 2: </strong> {addressTwo ? addressTwo : ''}
        </div>
        <div>
          <strong>City: </strong> {city}
        </div>
        <div>
          <strong>State: </strong> {state}
        </div>
        <div>
          <strong>Zip Code: </strong> {zip}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(AddressCard)
