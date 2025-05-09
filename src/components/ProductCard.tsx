import React from "react";
import { Product } from "../types/product";
import "./ProductCard.css";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => (
  <div className="product-card">
    <img src={product.thumbnail} alt={product.title} />
    <h3>{product.title}</h3>
    <p>Category: {product.category}</p>
    <p>Price: ${product.price}</p>
    <p>Stock: {product.stock}</p>
  </div>
);

export default ProductCard;