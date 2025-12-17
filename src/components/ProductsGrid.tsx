import { useEffect, useState } from "react";
import type { CartItem, Product } from "../types";
import ProductSkeleton from "../ui/ProductSkeleton";

type ProductsGridProps = {
  activeCategory: string;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export default function ProductsGrid({
  activeCategory,
  setCartItems,
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
        setError(err instanceof Error ? err.message : "Something went wrong");
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

      {!loading &&
        !error &&
        products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.thumbnail} alt={p.title} className="product-image" />

            <h3 className="product-title">{p.title}</h3>
            <p className="product-description">
              {p.description.slice(0, 90)}...
            </p>
            <p className="product-category">Category: {p.category}</p>

            <div className="product-footer">
              <span className="product-price">${p.price}</span>
              <button
                className="add-btn"
                onClick={() => {
                  setCartItems((items) => {
                    const existing = items.find((i) => i.id === p.id);

                    if (existing) {
                      return items.map((i) =>
                        i.id === p.id ? { ...i, qty: i.qty + 1 } : i
                      );
                    }

                    return [...items, { ...p, qty: 1 }];
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
