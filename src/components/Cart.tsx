import useCart from "../hooks/useCart"
import { useState } from "react"
import CartLineItem from "./CartLineItem"

const Cart = () => {
  const [confirm, setConfirm] = useState(false)
  const { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart } = useCart()

  const onSubmitOrder = () => {
    dispatch({ type: REDUCER_ACTIONS.SUBMIT })
    setConfirm(true)
  }

  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <>
      <h2 className="offscreen absolute left-[-10000px]">Cart</h2>
      <ul className="cart p-0 mt-[0.5em]">
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.sku}
              item={item}
              dispatch={dispatch}
              REDUCER_ACTIONS={REDUCER_ACTIONS}
            />
          )
        })}
      </ul>
      <div className="cart__totals flex flex-col gap-[1em]">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          className="cart__submit border rounded-md p-[0.25em] px-[0.75em] md:max-w-[300px] hover:brightness-50 disabled:contrast-[.1] disabled:border-none"
          disabled={!totalItems}
          onClick={onSubmitOrder}
        >
          Place Order
        </button>
      </div>
    </>
  )

  const content = (<main className="main main--products flex flex-row flex-wrap justify-between gap-4 p-[0.25em] mx-[1em]">{pageContent}</main>)

  return content
}

export default Cart
