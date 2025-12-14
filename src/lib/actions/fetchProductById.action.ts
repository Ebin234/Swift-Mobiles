import Product from "@/models/product";


export const fetchProductById = async (id:string)=>{
    try{
        console.log("fetchProduct",id)
        const product = await Product.findById(id).lean();
        console.log("fetch",product)
        const jsonData = JSON.parse(JSON.stringify(product))
        console.log({jsonData})
        return {success:true,jsonData};
    }catch(error){
        return {success:false,e:error};
    }
}