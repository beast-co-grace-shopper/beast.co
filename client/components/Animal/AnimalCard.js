import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const AnimalCard = props => {
  return (
    <Container className="card">
      <Row>
        <Col>
          <Image
            src={props.animal.photo}
            style={{height: '100px', width: '100px'}}
            fluid
          />
        </Col>
        <Col>
          <h1>{props.animal.name}</h1>
          <p>Animal review...</p>
          <p>Price: ${props.animal.cost}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default AnimalCard
