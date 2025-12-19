import type { CartItem, Product } from "../types";
import { useState } from "react";
import ConfirmOverlay from "./ConfirmOverlay";

type CartModalProps = {
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleAdd: (p: Product) => void;
  decreaseQty: (id: number) => void;
  resetCart: () => void;
};

export default function CartModal({
  setShowCart,
  cartItems,
  setCartItems,
  resetCart,
  handleAdd,
  decreaseQty,
}: CartModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function removeItem(id: number) {
    setCartItems((items) => items.filter((i) => i.id !== id));
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      <div className="cart-modal">
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="cart-close-btn" onClick={() => setShowCart(false)}>
            ✕
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <p className="cart-empty">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="cart-item-img"
                />

                <div className="cart-item-info">
                  <p className="cart-item-title">{item.title}</p>
                  <p className="cart-item-price">
                    ${item.price} × {item.qty}
                  </p>
                </div>

                <div className="cart-qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => handleAdd(item)}>+</button>
                </div>

                <button
                  className="cart-remove-btn"
                  onClick={() => {
                    removeItem(item.id);
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <span className="cart-total">Total: ${totalPrice.toFixed(2)}</span>
            <div>
              <button
                className="cart-clear-btn"
                onClick={() => {
                  resetCart();
                }}
              >
                Clear
              </button>
              <button
                className="cart-checkout-btn"
                onClick={() => setIsConfirmOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {isConfirmOpen && (
        <ConfirmOverlay
          totalPrice={totalPrice}
          setIsConfirmOpen={setIsConfirmOpen}
          setCartItems={setCartItems}
          setShowCart={setShowCart}
        />
      )}
    </>
  );
}
