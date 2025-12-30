"use client";
// export const dynamic = "force-dynamic";

import NavBar from "@/components/navbar";
import ProductCard from "@/components/productCard";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { IProduct } from "@/models/product";
import { useEffect, useState } from "react";

export default function Home() {
  // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<[IProduct] | []>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  useEffect(() => {
    fetchProduct();
  }, [currentPage]);

  const fetchProduct = async () => {
    try {
      const data = await fetch(`/api/user/products?page=${currentPage}`);
      const { products, totalPages } = await data.json();
 
      setTotalPageCount(totalPages);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product: IProduct) => {
              return (
                <Link
                  href={product.productLink}
                  key={product._id.toString()}
                  target="_blank"
                >
                  <ProductCard
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    imageUrl={product.image}
                  />
                </Link>
              );
            })}
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-1 mt-8">
            <Pagination totalPageCount={totalPageCount} setCurrentPage={setCurrentPage}  />
          </div>
        </div>
      </main>
    </div>
  );
}
