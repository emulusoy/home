
import React from 'react';

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onAddToCart: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-extrabold text-white">
            {product.price.toFixed(2)} TL
          </span>
          <button
            onClick={onAddToCart}
            className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition-colors"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;