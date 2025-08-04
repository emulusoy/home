import React from "react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover hover:opacity-90"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-white text-lg font-bold">{product.name}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-purple-400 font-extrabold text-xl">{product.price.toFixed(2)} TL</span>
          <button
            onClick={onAddToCart}
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;