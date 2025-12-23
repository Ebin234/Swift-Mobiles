"use client";
// components/ProductCard.tsx
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface ProductCardProps {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({
  name,
  category,
  price,
  imageUrl,
}: ProductCardProps) {
  // console.log({ imageUrl });

  const [url, setUrl]: [string, Dispatch<SetStateAction<string>>] =
    useState(imageUrl);

  return (
    <div className="w-full max-w-sm rounded-2xl shadow-md bg-white overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="relative w-full h-[200px]">
        <Image
          src={url}
          onError={() => setUrl("/images/ImageNotFound.png")}
          alt={name}
          fill
          unoptimized
          objectFit="contain"
          className="object-contain hover:scale-105 transition-transform duration-300 pt-4"
        />
      </div>
      <div className="p-4 flex flex-col justify-between h-full min-h-[250px]">
  <div className="mt-4">
    <h3 className="text-[16px] font-semibold text-gray-800 leading-snug mb-2 line-clamp-4">
      {name}
    </h3>
    <h4 className="text-gray-700 text-sm mb-2">
      Category: <span className="font-medium">{category}</span>
    </h4>
    <p className="text-gray-600 text-base font-semibold">₹{price.toFixed(2)}</p>
  </div>

  <button className="mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition duration-200">
    Add to Cart
  </button>
</div>

    </div>
  );
}
