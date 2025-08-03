"use client";

import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import type { NextPage } from "next";
import Header from "./components/Header";

type CartItem = {
  id: number;
  name: string;
  price: number;
};

const Home: NextPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product: CartItem) => {
    const newCart = [...cart, product];
    setCart(newCart);
    alert(`${product.name} sepete eklendi!`);
  };

  const handleGoToCart = () => {
    const cartData = JSON.stringify(cart);
 window.location.href = `http://localhost:3001/?items=${encodeURIComponent(cartData)}`;

  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <Header cartItemCount={cart.length} onGoToCart={handleGoToCart} />
      <main className="container mx-auto p-8 pt-10">
        <h2 className="text-4xl font-bold text-white mb-10">
          Ürünler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
};

export default Home;