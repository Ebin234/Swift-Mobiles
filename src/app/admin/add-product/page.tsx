import AddProductForm from "@/components/addProductForm"
import Link from "next/link"

export default function AddProduct(){
    return (
        <div className="bg-white h-screen">
            
            <h1 className="flex justify-center items-center pt-8 pb-8 text-2xl text-black font-semibold">Add Product</h1>
            <Link href={"/admin"} className="flex w-40 ml-6 mb-4 justify-center">
                      <h2 className=" bg-green-700 w-40 text-2xl rounded-[0.5rem] cursor-pointer flex justify-center">
                        Admin Page
                      </h2>
                    </Link>
            <AddProductForm/>
        </div>
    )
}