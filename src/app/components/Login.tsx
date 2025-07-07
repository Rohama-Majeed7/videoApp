"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert("Login failed: " + result.error);
      } else {
        alert("Login successful");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>

      <p className="mt-4 text-center">
        Do not have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="text-blue-500 hover:underline"
        >
          Register
        </button>
      </p>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => signIn("github")}
          className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
        >
          Sign in with GitHub
        </button>
      </div>
    </form>
  );
};

export default Login;
