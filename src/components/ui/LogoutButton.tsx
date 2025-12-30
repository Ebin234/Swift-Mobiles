"use client";

import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/auth/login");
  };
  return (
    <button
      onClick={handleLogout}
      className="p-1 bg-green-700 w-40 text-2xl mr-6 mb-4 rounded-[0.5rem] cursor-pointer"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
