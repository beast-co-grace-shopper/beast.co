import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import {fetchSelectedAnimal} from '../../store/actions/animal-actions'

class SingleAnimal extends Component {
  constructor() {
    super()
    this.state = {
      Quantity: 0,
      Price: '$0'
    }
  }

  componentDidMount() {
    this.props.fetchSelectedAnimal(this.props.match.params.id)
  }

  changeQuantity(event) {
    //console.log(event.target.value);
    let Price =
      '$' +
      Math.floor(event.target.value * this.props.animals[0].cost * 100) / 100
    this.setState({...this.state, Quantity: event.target.value, Price})
  }

  render() {
    return (
      <div>
        {this.props.animals && this.props.animals.length === 1 ? (
          <Container className="card">
            <Row>
              <Col>
                <Image
                  src={this.props.animals[0].photo}
                  style={{height: '300px', width: '300px'}}
                  fluid
                />
              </Col>
              <Col>
                <h1>{this.props.animals[0].name}</h1>
                <div>
                  {this.props.animals[0].description &&
                  this.props.animals[0].description.length > 0 ? (
                    <p>Description: {this.props.animals[0].description}</p>
                  ) : (
                    ''
                  )}
                </div>
                <p>Price: ${this.props.animals[0].cost}</p>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <p>Price:</p>
                  </Col>
                  <Col>
                    <input
                      type="text"
                      disabled={true}
                      value={this.state.Price}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Quantity:</p>
                  </Col>
                  <Col>
                    <input
                      type="number"
                      onChange={event => {
                        this.changeQuantity(event)
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button>ADD TO CART</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    animals: state.animals
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSelectedAnimal: animalId => dispatch(fetchSelectedAnimal(animalId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAnimal)
