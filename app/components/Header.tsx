
"use client";

import React from 'react';

type HeaderProps = {
  cartItemCount: number;
  onGoToCart: () => void;
};

const Header: React.FC<HeaderProps> = ({ cartItemCount, onGoToCart }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 shadow-md z-20">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">
          E-Ticaret
        </h1>
        <button 
          onClick={onGoToCart}
          className="bg-purple-600 text-white font-bold py-2 px-6 rounded-full hover:bg-purple-700 transition-colors shadow-lg"
        >
          GIT SU SEPETE ({cartItemCount})
        </button>
      </div>
    </header>
  );
};

export default Header;