import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import {getAverageRating} from '../../store/'

class AnimalCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // componentDidMount(){
  //   this.props.getAverageRating(this.props.animal.id);
  // }

  render() {
    // let rating = this.props.getAverageRating(this.props.animal.id)
    // console.log(rating)

    return (
      <Container className="card">
        <Row>
          <Col>
            <Image
              src={this.props.animal.photo}
              style={{height: '100px', width: '100px'}}
              fluid
            />
          </Col>
          <Col>
            <h1>{this.props.animal.name}</h1>
            <p>Animal review...</p>
            <p>Price: ${this.props.animal.cost}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  averageRating: state.cart
})

const mapDispatchToProps = dispatch => ({
  getAverageRating: id => dispatch(getAverageRating(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnimalCard)

// const AnimalCard = props => {
//   return (
//     <Container className="card">
//       <Row>
//         <Col>
//           <Image
//             src={props.animal.photo}
//             style={{height: '100px', width: '100px'}}
//             fluid
//           />
//         </Col>
//         <Col>
//           <h1>{props.animal.name}</h1>
//           <p>Animal review...</p>
//           <p>Price: ${props.animal.cost}</p>
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// export default AnimalCard
