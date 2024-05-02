import useCart from "../hooks/useCart"

type FooterPropsType = {
  viewCart: boolean
}

const Footer = ({ viewCart }: FooterPropsType) => {
  const { totalItems, totalPrice } = useCart()
  const year: number = new Date().getFullYear()

  const pageContent = viewCart ? (
    <p>Shopping Cart &copy; {year}</p>
  ) : (
    <>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: {totalPrice}</p>
      <p>Shopping Cart &copy; {year}</p>
    </>
  )

  const content = <footer className="footer flex flex-col flex-grow  flex-nowrap justify-end p-[0.25em] mx-[1em] ">{pageContent}</footer>

  return content
}

export default Footer
