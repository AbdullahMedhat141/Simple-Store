import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

type CategoriesProps = {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function Categories({
  activeCategory,
  setActiveCategory,
}: CategoriesProps) {
  const [categoriesList, setCategoriesList] = useLocalStorage<string[]>(
    "categories-list",
    []
  );

  useEffect(() => {
    async function fetchCategories() {
      const catRes = await fetch(
        "https://dummyjson.com/products/category-list"
      );
      const categories: string[] = await catRes.json();
      setCategoriesList(categories);
    }
    fetchCategories();
  }, [setCategoriesList]);

  return (
    <div className="categories">
      <p>Filter by Category:</p>
      <div className="category-list">
        <button
          className={`category-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => {
            setActiveCategory("all");
          }}
        >
          All Products
        </button>

        {categoriesList.map((c) => (
          <button
            key={c}
            className={`category-btn ${activeCategory === c ? "active" : ""}`}
            onClick={() => {
              setActiveCategory(c);
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
