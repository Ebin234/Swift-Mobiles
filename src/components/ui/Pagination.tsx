"use client";

import { useEffect, useState } from "react";

function Pagination({
  totalPageCount=0,
  setCurrentPage,
}: {
  totalPageCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [count, setCount] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(1);

  useEffect(() => {
    setActivePage(count * 5 + 1);
    setCurrentPage(count * 5 + 1);
  }, [count]);

  const handleNext = (acc: boolean) => {
    if (acc) {
      setCount((prev) => prev + 1);
    } else {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <>
      <button
        onClick={() => handleNext(false)}
        disabled={count == 0}
        className="px-3 py-2 rounded-full border text-sm hover:bg-gray-950 hover:text-white text-black"
      >
        ‹‹
      </button>
      {[...Array((totalPageCount + 1)).keys()]
        .slice(count * 5 + 1)
        .map((page) => {
          return (
            <button
              onClick={() => {
                setActivePage(page);
                setCurrentPage(page);
              }}
              key={page}
              className={`w-9 h-9 rounded-full border text-sm  hover:bg-gray-950 hover:text-white  ${
                activePage === page ? "bg-gray-950 text-white" : "text-black"
              }`}
            >
              {page}
            </button>
          );
        })}
      <button
        onClick={() => handleNext(true)}
        disabled={totalPageCount < (count + 1) * 5}
        className="px-3 py-2 rounded-full border text-sm  hover:bg-gray-950 hover:text-white text-black"
      >
        ››
      </button>
    </>
  );
}

export default Pagination;
