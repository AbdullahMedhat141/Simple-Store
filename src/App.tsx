import { useLocalStorage } from "usehooks-ts";
import CartBar from "./components/CartBar";
import Categories from "./components/Categories";
import ProductsGrid from "./components/ProductsGrid";
import CartModal from "./ui/CartModal";
import type { CartItem, Product } from "./types";

function App() {
  const [cartItems, setCartItems, resetCart] = useLocalStorage<CartItem[]>(
    "cart-items",
    []
  );

  const [activeCategory, setActiveCategory] = useLocalStorage(
    "active-category",
    "all"
  );

  const [showCart, setShowCart] = useLocalStorage<boolean>("show-cart", false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  function handleAdd(p: Product) {
    setCartItems((items) => {
      const existing = items.find((i) => i.id === p.id);

      if (existing) {
        return items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      }

      return [...items, { ...p, qty: 1 }];
    });
  }

  function decreaseQty(id: number) {
    setCartItems((items) =>
      items
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Simple E-Commerce Store</h1>
      </div>
      <CartBar cartCount={cartCount} setShowCart={setShowCart} />

      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ProductsGrid
        activeCategory={activeCategory}
        cartItems={cartItems}
        handleAdd={handleAdd}
        decreaseQty={decreaseQty}
      />

      {showCart && (
        <CartModal
          setShowCart={setShowCart}
          cartItems={cartItems}
          setCartItems={setCartItems}
          resetCart={resetCart}
          handleAdd={handleAdd}
          decreaseQty={decreaseQty}
        />
      )}
    </div>
  );
}

export default App;
