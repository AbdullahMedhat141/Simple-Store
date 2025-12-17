import type { CartItem } from "../types";

type ConfirmOverlayProps = {
  totalPrice: number;
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export default function ConfirmOverlay({
  totalPrice,
  setIsConfirmOpen,
  setCartItems,
}: ConfirmOverlayProps) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <h3>Confirm Checkout</h3>
        <p>
          Are you sure you want to place this order for{" "}
          <strong>${totalPrice.toFixed(2)}</strong>?
        </p>

        <div className="confirm-actions">
          <button
            className="confirm-cancel"
            onClick={() => setIsConfirmOpen(false)}
          >
            Cancel
          </button>

          <button
            className="confirm-yes"
            onClick={() => {
              setCartItems([]);
              setIsConfirmOpen(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
