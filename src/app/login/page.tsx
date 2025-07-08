"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("login error:", res);

    if (res?.error) setError(res.error);
    else {
      alert("Login Successfuly")
      router.push("/")};
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-purple-400">
          Welcome Back
        </h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Login
        </button>

        <p className="text-sm text-slate-400 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-purple-400 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
