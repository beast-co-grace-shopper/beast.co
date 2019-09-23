import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'

const OrderRow = ({order}) => {
  const orderDate = new Date(order.purchaseDate)
  const orderTotal =
    order &&
    order.cart
      .reduce((total, {purchasePrice, quantity}) => {
        return Number(total + purchasePrice * quantity)
      }, 0)
      .toFixed(2)
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return (
    <React.Fragment>
      <Table bordered hover size="sm">
        <thead className="thead-dark">
          <tr>
            <th>ORDER PLACED</th>
            <th>TOTAL</th>
            <th>SHIP TO</th>
            <th>ORDER#</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {`${orderDate.toLocaleDateString()}@${orderDate.toLocaleTimeString()}`}
            </td>
            <td>{formatter.format(orderTotal)}</td>
            <td>{`${order.firstName} ${order.lastName}`}</td>
            <td>{order.id}</td>
          </tr>
        </tbody>
      </Table>

      <Table bordered hover size="sm">
        <thead className="thead-light">
          <tr>
            <th>Shipping Address</th>
            <th>Payment Method</th>
            <th>Order Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-uppercase">
              <ul className="list-unstyled">
                <li>{`${order.firstName} ${order.lastName}`}</li>
                <li>{order.address}</li>
                <li>{order.address2}</li>
                <li>
                  {order.city}, {order.state} {order.zip}
                </li>
              </ul>
            </td>
            <td>TBD</td>
            <td>
              <ul className="list-unstyled">
                <li>Item(s) Subtotal: {formatter.format(orderTotal)}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </Table>

      <Table bordered hover size="sm">
        <thead className="thead-light">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.cart.map(item => (
            <tr key={item.id}>
              <td>{item.animal.name}</td>
              <td>{item.quantity}</td>
              <td>{item.purchasePrice}</td>
              <td>
                {formatter.format(Number(item.quantity * item.purchasePrice))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  )
}

export default OrderRow
