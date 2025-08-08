import React, { useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (selectedSize: string, selectedColor: string) => void;
  onQuickView: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleAddToCartClick = () => {
    onAddToCart(selectedSize, selectedColor);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md group transform transition duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative">
        {/* Ürün Resmi */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {/* Etkileşim İkonları */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="p-3 rounded-full bg-white text-gray-800 shadow-md hover:text-red-500 transition-colors"
            title="Favorilere Ekle"
          >
            <FaHeart />
          </button>
          <button 
            className="p-3 rounded-full bg-white text-gray-800 shadow-md hover:text-purple-600 transition-colors"
            onClick={onQuickView}
            title="Hızlı Görünüm"
          >
            <FaEye />
          </button>
        </div>

        {/* Renk Varyasyonları */}
        <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {product.colors.map(color => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full border-2 transform transition-transform duration-200 ${
                selectedColor === color ? 'scale-125 border-purple-600' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
        </div>
      </div>
      
      {/* Ürün Bilgileri */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-gray-900 text-xl font-bold">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        
        {/* Beden Seçimi */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-800 font-medium text-sm">Beden:</span>
          {product.sizes.map(size => (
            <button
              key={size}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedSize === size
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        
        {/* Fiyat ve Sepete Ekle Butonu */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-purple-600 font-extrabold text-2xl">{product.price.toFixed(2)} TL</span>
          <button
            onClick={handleAddToCartClick}
            className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;