// src/components/ProductDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams(); // get product ID from URL

  // Fetch or load product details using the id here

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Product Details for ID: {id}</h2>
      {/* Render your product info here */}
    </div>
  );
}
