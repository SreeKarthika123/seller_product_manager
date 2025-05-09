import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import { Product } from "../types/product";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleAdd = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => categoryFilter === "All" || p.category === categoryFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "price": return a.price - b.price;
        case "stock": return a.stock - b.stock;
        case "title": return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="product-manager">
      <h2>Seller Product Manager</h2>
      <div className="toolbar">
        <input placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="All">All</option>
          {uniqueCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="stock">Stock</option>
          <option value="title">Title</option>
        </select>
      </div>
      <ProductForm onAdd={handleAdd} />
      <div className="grid">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductList;