export const dynamic = "force-dynamic";

import NavBar from "@/components/navbar";
import ProductCard from "@/components/productCard";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { IProduct } from "@/models/product";

export default async function Home() {
  const BASE_URL = process.env.BASE_URL;
  const data = await fetch(`${BASE_URL}/products`);
  const { products } = await data.json();
  console.log(products);

  return (
    <div>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: IProduct) => {
              return (
                <Link
                  href={product.productLink}
                  key={product._id}
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
            <Pagination />
          </div>
        </div>
      </main>
    </div>
  );
}
