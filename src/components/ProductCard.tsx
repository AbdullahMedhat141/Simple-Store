import type { CartItem, Product } from "../types";

type ProductCardProps = {
  cartItems: CartItem[];
  product: Product;
  handleAdd: (p: Product) => void;
  decreaseQty: (id: number) => void;
};

export default function ProductCard({
  product: p,
  cartItems,
  handleAdd,
  decreaseQty,
}: ProductCardProps) {
  const cartItem = cartItems.find((i) => i.id === p.id);

  return (
    <div className="product-card" key={p.id}>
      <img src={p.thumbnail} alt={p.title} className="product-image" />

      <h3 className="product-title">{p.title}</h3>
      <p className="product-description">{p.description.slice(0, 90)}...</p>
      <p className="product-category">Category: {p.category}</p>

      <div className="product-footer">
        <span className="product-price">${p.price}</span>
        {!cartItem ? (
          <button className="add-btn" onClick={() => handleAdd(p)}>
            Add to cart
          </button>
        ) : (
          <div className="cart-qty-controls">
            <button onClick={() => decreaseQty(p.id)}>-</button>
            {cartItem.qty}
            <button onClick={() => handleAdd(p)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}
