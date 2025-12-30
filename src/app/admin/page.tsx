import Link from "next/link";
import LogoutButton from "@/components/ui/LogoutButton";
import ProductsTable from "@/components/ProductsTable";

export default async function Admin() {
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
          <ProductsTable />
      </div>
    </div>
  );
}
