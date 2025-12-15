"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductCardData = {
  _id: string | null;
  name: string | null;
  category: string | null;
  price: string | null;
  image: string | null;
  productLink: string | null;
  edit: boolean;
};

export default function AddProductForm({
  _id : id ,
  name,
  category,
  price,
  image,
  productLink,
  edit,
}: ProductCardData) {

  const [formData, setFormData] = useState({
    name: name ? name : "",
    category: category ? category : "Unboxed",
    price: price ? price : "",
    image: image ? image : "",
    productLink: productLink ? productLink : "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res : Response;
      if (edit) {
        res = await fetch(`/api/products/edit/${id}`,{
          method:"PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (!res.ok) throw new Error(`Failed to ${edit ? `edit` : `add`} product`);

      const data = await res.json();
      alert(`✅ Product ${edit ? `edited` : `added`} successfully!`);
      // console.log(data);

      router.push('/admin');
    } catch (err) {
      alert(`❌ Error ${edit ? `editing` : `adding`} product. Check console.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* <div>
            <label className="block font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div> */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Choose an option:
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Unboxed">Unboxed</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Product Link
            </label>
            <input
              type="text"
              name="productLink"
              value={formData.productLink}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border text-black border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
