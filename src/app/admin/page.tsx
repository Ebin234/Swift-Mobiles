export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { deleteProduct } from "@/lib/actions/deleteProduct.action";
import DeleteButton from "@/components/ui/DeleteButton";
import { revalidatePath } from "next/cache";
import LogoutButton from "@/components/ui/LogoutButton";


export default async function Admin() {
  await connectDB();
  const products = await Product.find({});
  console.log("prod", products[0]);

  const handleDelete = async (id: string) => {
    "use server";
    await deleteProduct(id);
    revalidatePath("/admin");
  };

  return (
    <div className="bg-white h-screen">
      <h1 className="flex justify-center items-center pt-8 text-2xl text-black font-semibold">
        Admin Page
      </h1>

      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <Link
            href={"/admin/add-product"}
            className="flex w-40 ml-6 mb-4 justify-center"
          >
            <h2 className=" bg-green-700 w-40 text-2xl rounded-[0.5rem] cursor-pointer flex justify-center items-center">
              Add Product
            </h2>
          </Link>
          <LogoutButton />
        </div>
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
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
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
                    id={product._id.toString()}
                    handleDelete={handleDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
