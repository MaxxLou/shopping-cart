import { ChangeEvent, ReactElement, memo } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"

type CartLineItemPropsType = {
  item: CartItemType
  dispatch: React.Dispatch<ReducerAction>
  REDUCER_ACTIONS: ReducerActionType
}

const CartLineItem = ({
  item,
  dispatch,
  REDUCER_ACTIONS,
}: CartLineItemPropsType) => {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url).href

  const lineTotal: number = item.qty * item.price
  const highestQty: number = 20 > item.qty ? 20 : item.qty
  const optionsValues: number[] = [...Array(highestQty).keys()].map(
    (i) => i + 1
  )
  const options: ReactElement[] = optionsValues.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    )
  })

  const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTIONS.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    })
  }

  const onRemoveFromCart = () =>
    dispatch({
      type: REDUCER_ACTIONS.REMOVE,
      payload: item,
    })

  const content = (
    <li className="cart__item grid grid-flow-col auto-cols-[4fr_3fr_1.5fr_1.5fr] items-center text-center gap-2 mb-[0.5em]">
      <img src={img} alt={item.name} className="cart__img hidden w-[100%] min-w-[68px] md:block rounded-lg" />
      <div aria-label="Item Name" className="font-[900] text-lg">{item.name}</div>
      <div aria-label="Price Per Item">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price)}
      </div>
      <label htmlFor="itemQty" className="offscreen absolute left-[-10000px]">
        Item Quantity
      </label>
      <select
        name="itemQty"
        id="itemQty"
        className="cart__select border rounded-md focus:outline-none"
        value={item.qty}
        aria-label="Item Quantity"
        onChange={onChangeQty}
      >
        {options}
      </select>

      <div className="cart__item-subtotal hidden text-center md:block" aria-label="Line Item Subtotal">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(lineTotal)}
      </div>
      <button
        className="cart__button border rounded-md w-11 p-[0.25em] mx-auto hover:border-gray-500"
        aria-label="Remove Item From Cart"
        title="Remove Item From Cart"
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  )
  return content
}

function areItemsEqual({item: prevItem}: CartLineItemPropsType, {item: nextItem}: CartLineItemPropsType) {
  return Object.keys(prevItem).every(key => {
    return prevItem[key as keyof CartItemType] === nextItem[key as keyof CartItemType]
  })
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(CartLineItem, areItemsEqual)


export default MemoizedCartLineItem
