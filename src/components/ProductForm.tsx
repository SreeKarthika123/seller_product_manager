import React, { useState } from "react";
import { Product } from "../types/product";
import "./ProductForm.css";

interface Props {
  onAdd: (product: Product) => void;
}

const ProductForm: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
    thumbnail: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now(),
      title: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
      thumbnail: formData.thumbnail
    };
    onAdd(newProduct);
    setFormData({ title: "", price: "", category: "", stock: "", thumbnail: "" });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>Add Product</h3>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
      <input name="stock" placeholder="Stock" type="number" value={formData.stock} onChange={handleChange} required />
      <input name="thumbnail" placeholder="Image URL" value={formData.thumbnail} onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;