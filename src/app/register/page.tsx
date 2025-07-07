"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      if (res.status === 201) router.push("/login");
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: { error?: string } } }).response
          ?.data?.error === "string"
      ) {
        setError(
          (err as { response: { data: { error: string } } }).response.data.error
        );
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-100">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-purple-400">
          Create an Account
        </h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded-lg bg-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          Register
        </button>

        <p className="text-sm text-slate-400 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
