"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-white text-black flex justify-between items-center px-4 h-[75px] ">
      <Link href={"/"}><h1 className="text-2xl font-bold">Swift Mobiles</h1></Link>
      <input
        type="text"
        placeholder="Serach"
        className="w-[500px] h-9 border-2 rounded-3xl px-4 py-1 "
      />
      <div className="flex gap-8 text-[18px] font-semibold px-3">
      <Link href={"/info"}>Info</Link>
      <Link href={"/cart"}>Cart</Link>
      </div>
    </div>
  );
}
