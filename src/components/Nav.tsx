type NavPropsType = {
  viewCart: boolean
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({ viewCart, setViewCart }: NavPropsType) => {
  const button = viewCart ? (
    <button onClick={() => setViewCart(false)} className="min-w-[135px] border rounded-md p-[0.25em] px-[0.75em] hover:brightness-50">View products</button>
  ) : (
    <button onClick={() => setViewCart(true)} className="min-w-[135px] border rounded-md p-[0.25em] px-[0.75em] hover:brightness-50">View Cart</button>
  )

  const content = <nav className="nav flex justify-end gap-[0.5em]">{button}</nav>

  return content
}

export default Nav
