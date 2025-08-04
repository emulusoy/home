"use client";
import './globals.css';
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    alert(`${product.name} sepete eklendi!`);
  };

  const handleGoToCart = () => {
    const cartData = JSON.stringify(cart);
    window.location.href = `http://localhost:3001/?items=${encodeURIComponent(cartData)}`;
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <Navbar cartItemCount={cart.length} onGoToCart={handleGoToCart} />

      <main className="container mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-white mb-10">Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}