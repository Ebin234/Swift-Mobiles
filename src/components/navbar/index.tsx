
export default function NavBar(){
    return(
        <div className="bg-white text-black flex justify-between items-center px-2.5 h-[75px] ">
            <h1 className="text-2xl font-bold">Swift Mobiles</h1>
            <input type="text" placeholder="Serach" className="w-[500px] h-9 border-2 rounded-3xl px-4 py-1 "  />
            <h2>Cart</h2>
        </div>
    )
}