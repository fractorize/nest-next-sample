"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/widgets/loading";

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const formData = new FormData(event.target);
      if (!formData.get("officialEmail") || !formData.get("password")) {
        throw new Error("Email and password are required");
      }
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw await res.json();
      }
      router.push("/");
    } catch (error: any) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="input input-sm input-bordered flex items-center gap-2">
          <input
            name="officialEmail"
            type="email"
            className="grow"
            placeholder="Email"
            defaultValue="john.doe@techinnovators.com"
          />
        </label>
        <label className="input input-sm input-bordered flex items-center gap-2">
          <input
            name="password"
            type="password"
            className="grow"
            placeholder="Password"
            defaultValue="pwd"
          />
        </label>
        <div className="text-error">{error && <p>{error.message}</p>}</div>
        <button
          className="btn btn-sm btn-primary"
          aria-disabled={isLoading}
          type="submit"
        >
          {isLoading ? <Loading /> : "Login"}
        </button>
      </form>
    </div>
  );
}
