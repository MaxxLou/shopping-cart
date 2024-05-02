import Nav from "./Nav"
import useCart from "../hooks/useCart"

type HeaderPropsType = {
  viewCart: boolean,
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

const Header = ({viewCart, setViewCart}: HeaderPropsType) => {
const {totalItems, totalPrice} = useCart()

  const content = (
    <header className="header bg-white sticky top-0 z-10 border-b p-[0.25em] mx-[1em]">
      <div className="header__title-bar flex justify-between mb-[0.5em]">
        <h1 className="text-[46px]">Sweatshirts</h1>
          <div className="header__price-box right-0">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: {totalPrice}</p>
          </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  )

  return content
}

export default Header