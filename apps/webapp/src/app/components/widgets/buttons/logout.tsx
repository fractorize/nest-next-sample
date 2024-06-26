"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (!res.ok) {
      throw await res.json();
    }
    router.push("/login");
  };
  return (
    <button className="btn btn-sm btn-primary" onClick={() => logout()}>
      Logout
    </button>
  );
}
