import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import AnimalCard from '../animals/AnimalCard'

// class Cart extends Component {

//     componentDidMount() {
//       this.props.fetchCart()
//     }

//     render() {
//       const animals = this.props.animals

//       return (
//         <div>
//           <h1>ALL ANIMALS</h1>
//           <div>
//             {animals && animals.length
//               ? animals.map(animal => (
//                   <AnimalCard key={animal.id} animal={animal} />
//                 ))
//               : 'There are no animals in the database...'}
//           </div>
//         </div>
//       )
//     }
//   }

//   const mapStateToProps = state => ({
//     animals: state.cart
//   })

//   const mapDispatchToProps = dispatch => ({
//     fetchCart: () => dispatch(fetchCart())
//   })

//   export default connect(mapStateToProps, mapDispatchToProps)(Cart)

// const Cart = (cart) => {
//   return (
//     <Container className="cart-container">
//         <Col className='shopping-cart'>
//         <div>
//           {cart.animal && cart.length
//             ? animals.map(animal => (
//                 <AnimalCard key={animal.id} animal={animal} />
//               ))
//             : 'Shopping Cart is Empty...'}
//         </div>
//         </Col>
//         <Col className='order=details'>

//         </Col>
//     </Container>
//   )
// }

// export default Cart
