import AddProductForm from "@/components/addProductForm";
import Link from "next/link";
import {fetchProductById} from "@/lib/actions/fetchProductById.action";

export default async function AddProduct({params}:{params:Promise<{id:string}>}) {
    const {id} = await params;
    console.log(id);
    const {jsonData} = await fetchProductById(id);
    console.log("edit page",jsonData)
  return (
    <div className="bg-white h-screen">
      <h1 className="flex justify-center items-center pt-8 pb-8 text-2xl text-black font-semibold">
        Edit Product
      </h1>
      <Link href={"/admin"} className="flex w-40 ml-6 mb-4 justify-center">
        <h2 className=" bg-green-700 w-40 text-2xl rounded-[0.5rem] cursor-pointer flex justify-center">
          Admin Page
        </h2>
      </Link>
      <AddProductForm {...jsonData} edit={true} />
    </div>
  );
}