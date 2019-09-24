import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {Redirect} from 'react-router-dom'
import Container from 'react-bootstrap/Container'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}

    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    // User clicked submit

    console.log(this.props.name)
    console.log(this.props.amount)

    let {token} = await this.props.stripe.createToken({name: this.props.name})

    let chargeItem = {
      token: token.id,
      amount: this.props.amount,
      email: this.props.email
    }

    let response = await fetch('api/checkout/charge', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(chargeItem)
    })

    if (response.ok) console.log('Purchase Complete!')
    if (response.ok) this.setState({complete: true})

    this.props.cartSubmit()
  }

  render() {
    if (this.state.complete) return <Redirect to="/confirmation" />

    return (
      <Container>
        <div className="checkout card">
          <h5 className="card-header card-text">Enter Payment Information</h5>
          <div>
            <p />
          </div>
          <CardElement style={{base: {fontSize: '18px'}}} />
          <div>
            <p />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => this.submit()}
          >
            Submit Payment
          </button>
        </div>
      </Container>
    )
  }
}

export default injectStripe(CheckoutForm)
