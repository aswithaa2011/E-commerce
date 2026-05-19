import { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../components/Layouts/Banner";
import Cards from "../components/Cart/Cards";
import Footer from "../components/Layouts/Footer";
import CardContext from "../components/Cart/CardContext";
import CategoryFilter from "../components/Layouts/CategoryFilter";

const Home = () => {
  const { products } = useContext(CardContext);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filtered = products.filter(p => {
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || 
      p.categorySlug === activeCategory || 
      p.categoryName?.toLowerCase().replace(/\s+/g,"-") === activeCategory ||
      (p.categoryId && p.categoryId.slug === activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Banner />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CategoryFilter activeSlug={activeCategory} onChange={setActiveCategory} />
        <div className="mt-8">
          <Cards products={filtered} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
