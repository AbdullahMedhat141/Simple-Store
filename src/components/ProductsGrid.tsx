import { useEffect, useState } from "react";
import type { CartItem, Product } from "../types";
import ProductSkeleton from "../ui/ProductSkeleton";
import ProductCard from "./ProductCard";

type ProductsGridProps = {
  activeCategory: string;
  cartItems: CartItem[];
  handleAdd: (p: Product) => void;
  decreaseQty: (id: number) => void;
};

export default function ProductsGrid({
  activeCategory,
  cartItems,
  handleAdd,
  decreaseQty,
}: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const url =
          activeCategory === "all"
            ? "https://dummyjson.com/products"
            : `https://dummyjson.com/products/category/${activeCategory}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="products-grid">
      {loading &&
        Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)}

      {error && <p className="error">{error}</p>}

      {!loading &&
        !error &&
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cartItems={cartItems}
            handleAdd={handleAdd}
            decreaseQty={decreaseQty}
          />
        ))}
    </div>
  );
}
