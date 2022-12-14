import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      // first initialize the variable
      let total = 0

      // now implement the total  callback function using the foreach method
      cartList.forEach(eachItem => {
        total += eachItem.price * eachItem.quantity // add a total price (price * quantity)
      })

      return (
        <>
          <div className="summury-container">
            <h1 className="order-total">
              Order Total : <span className="total"> {total}/-</span>
            </h1>
            <p className="desc">
              <span className="length">{cartList.length} </span> items in cart
            </p>
            <button type="button" className="small-btn">
              CheckOut
            </button>
          </div>
          <button type="button" className="large-btn">
            CheckOut
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
