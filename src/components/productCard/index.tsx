"use client"
// components/ProductCard.tsx
import Image from "next/image";

interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
//   onAddToCart: () => void;
}

export default function ProductCard({
  name,
  category,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl shadow-md bg-white overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="relative h-60 w-full">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="object-contain hover:scale-105 transition-transform duration-300 pt-4"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center h-16">{name}</h3>
        <h4 className="text-gray-800 flex items-center">Category: <span className="pl-1">{category}</span></h4>
        <p className="text-gray-600 text-base">₹{price.toFixed(2)}</p>
        <button
          className="mt-2 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
