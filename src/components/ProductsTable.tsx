"use client";

import { IProduct } from "@/models/product";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "./ui/Pagination";
import { protectedFetch } from "@/lib/protectedFetch";
import DeleteButton from "./ui/DeleteButton";

function ProductsTable() {
  // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[] | []>([]);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);

  useEffect(() => {
    fetchProduct();
  }, [currentPage]);

  const fetchProduct = async () => {
    try {
      const data = await protectedFetch(
        `/api/admin/products?page=${currentPage}`
      );
      const { products, totalPages } = await data.json();

      setTotalPageCount(totalPages);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await protectedFetch(`/api/admin/products/delete-product/${id}`, {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p._id.toString() !== id.toString()));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-3 px-4 border-b text-black">Image</th>
            <th className="py-3 px-4 border-b text-black">Name</th>
            {/* <th className="py-3 px-4 border-b">Category</th> */}
            <th className="py-3 px-4 border-b text-black">Price</th>
            {/* <th className="py-3 px-4 border-b text-black">Stock</th> */}
            <th className="py-3 px-4 border-b text-center text-black">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id.toString()} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b text-black">
                <Image
                  src={product.image.trim()}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain rounded-lg "
                />
              </td>
              <td className="py-3 px-4 border-b font-medium text-black">
                <Link
                  href={product.productLink}
                  target="_blank"
                  className="hover:text-blue-500"
                >
                  {product.name}
                </Link>
              </td>
              {/* <td className="py-3 px-4 border-b">mobile</td> */}
              <td className="py-3 px-4 border-b text-black">
                ₹{product.price.toLocaleString()}
              </td>
              {/* <td className="py-3 px-4 border-b text-black">2</td> */}
              <td className="py-3 px-4 border-b text-center text-black">
                <Link
                  href={`/admin/edit-product/${product._id}`}
                  className="px-[19px] py-[7px] bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2"
                >
                  Edit
                </Link>
                <DeleteButton
                  id={product?._id?.toString() as string}
                  handleDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-1 mt-8">
        <Pagination
          totalPageCount={totalPageCount}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ProductsTable;
