import React from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const AnimalReview = props => {
  return (
    <Container className="address-form">
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" onChange={props.handleChange} />
          </Form.Group>

          {/* <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" name='state' onChange={props.handleChange}>
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group> */}

          <Form.Group as={Col} controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control name="rating" onChange={props.handleChange} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="description">
            <Form.Label>{props.animal.name} Review</Form.Label>
            <Form.Control
              name="description"
              placeholder="Tell us what you think..."
              as="textarea"
              rows="3"
              onChange={props.handleChange}
            />
          </Form.Group>
        </Form.Row>

        <Button
          variant="primary"
          type="submit"
          onClick={() => props.reviewSubmit()}
        >
          Submit
        </Button>
        <div>
          <p />
        </div>
      </Form>
    </Container>
  )
}

export default AnimalReview
