"use client";
import './globals.css';
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";

// Yeni Product arayüzü, ProductCard ile uyumlu hale getirildi
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[]; // Eklenen yeni özellik
  colors: string[]; // Eklenen yeni özellik
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // products.json dosyasının yeni yapıya sahip olduğundan emin olun
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // handleAddToCart fonksiyonu artık beden ve renk parametrelerini alıyor
  const handleAddToCart = (product: Product, selectedSize: string, selectedColor: string) => {
    // Sepete eklenen ürünü, seçilen beden ve renk bilgileriyle birlikte kaydet
    const newProduct = { ...product, selectedSize, selectedColor };
    setCart((prev) => [...prev, newProduct]);

    setAddedProduct(product);
    setTimeout(() => {
      setAddedProduct(null);
    }, 3000);
  };

  const handleGoToCart = () => {
    const cartData = JSON.stringify(cart);
    window.location.href = `http://localhost:3001/?items=${encodeURIComponent(cartData)}`;
  };

  const handleQuickView = () => {
    // Hızlı görünüm modalını açacak fonksiyon buraya gelecek
    // Şimdilik boş bırakılabilir
    alert("Hızlı Görünüm özelliği yakında!");
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <Navbar cartItemCount={cart.length} onGoToCart={handleGoToCart} />

      <main className="container mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-white mb-10">Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div className="relative" key={product.id}>
              <ProductCard
                product={product}
                // onAddToCart artık seçilen beden ve rengi de iletiyor
                onAddToCart={(selectedSize, selectedColor) => handleAddToCart(product, selectedSize, selectedColor)}
                onQuickView={handleQuickView}
              />
              {addedProduct?.id === product.id && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg z-10 animate-fade-in-out">
                  Sepete Eklendi!
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}