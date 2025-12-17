type CartBarProps = {
  cartCount: number;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CartBar({ cartCount, setShowCart }: CartBarProps) {
  return (
    <div className="cart-bar">
      <span>Cart Items: {cartCount}</span>

      <button className="cart-btn" onClick={() => setShowCart(true)}>
        <img src="/icon.svg" alt="shopping-cart" />
        {cartCount !== 0 && <span className="red-dot"></span>}
      </button>
    </div>
  );
}
