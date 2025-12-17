import { useLocalStorage } from "usehooks-ts";
import CartBar from "./components/CartBar";
import Categories from "./components/Categories";
import ProductsGrid from "./components/ProductsGrid";
import CartModal from "./ui/CartModal";
import type { CartItem } from "./types";

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
        setCartItems={setCartItems}
      />

      {showCart && (
        <CartModal
          setShowCart={setShowCart}
          cartItems={cartItems}
          setCartItems={setCartItems}
          resetCart={resetCart}
        />
      )}
    </div>
  );
}

export default App;
