import React from 'react'
import Table from 'react-bootstrap/Table'

const calculateShipping = shippingType => {
  switch (shippingType) {
    case 'Standard':
      return 500
    case 'Express':
      return 1000
    case 'Overnight':
      return 5000
    default:
      return 0
  }
}
const OrderRow = ({order}) => {
  const orderDate = new Date(order.purchaseDate)
  const orderSubtotal =
    order &&
    order.cart
      .reduce((total, {purchasePrice, quantity}) => {
        return Number(total + purchasePrice * quantity)
      }, 0)
      .toFixed(2)
  const subtotal = Number(orderSubtotal)
  const shipping = calculateShipping(order.deliveryType)
  const tax = (subtotal + shipping) * 0.15
  const grandTotal = subtotal + shipping + tax
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
            <td>{formatter.format(orderSubtotal)}</td>
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
            <th>Subtotal</th>
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
                <li>{formatter.format(orderSubtotal)}</li>
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
            <th>Total(s)</th>
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
          <tr>
            <td />
            <td />
            <td className="text-right font-weight-bold">Shipping Cost</td>
            <td>{formatter.format(shipping)}</td>
          </tr>
          <tr>
            <td />
            <td />
            <td className="text-right font-weight-bold">Tax</td>
            <td>{formatter.format(tax)}</td>
          </tr>
          <tr>
            <td />
            <td />
            <td className="text-right font-weight-bold">Grand Total</td>
            <td className="font-weight-bold">{formatter.format(grandTotal)}</td>
          </tr>
        </tbody>
      </Table>
    </React.Fragment>
  )
}

export default OrderRow
