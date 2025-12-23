export const dynamic = "force-dynamic";

import NavBar from "@/components/navbar";
import ProductCard from "@/components/productCard";
import Pagination from "@/components/ui/Pagination";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import Link from "next/link";

export default async function Home() {
  // const handleAddToCart = () => {
  //   alert("Added to cart!");
  // };

  await connectDB();
  const products = await Product.find({});
  console.log(products[0]?._id);

  return (
    <div>
      <NavBar />
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
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
          <div>
            // pagination
            <div className="flex items-center justify-center gap-1 mt-8">
              <Pagination />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
