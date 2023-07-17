"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, } from "react";
import Link from "next/link";

import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [loginButton, setLoginButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login successful", response.data);
      toast.success("Login successful")
      router.push("/profile")

    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message)

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 5) {
      setLoginButton(true);
    } else {
      setLoginButton(false);
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen py-2">
      <div className="flex flex-col px-6 py-5 rounded-xl border border-white">
        <h1 className="text-4xl text-teal-300 font-bold m-5">{loading ? "Processing..." : "Login"}</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input
          className="text-black text-center rounded-md mt-5 p-2"
          id="email"
          type="text"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">password</label>
        <input
          className="text-black text-center rounded-md mt-5 p-2"
          id="password"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className={loginButton ? "border border-green-500 p-3 m-5 rounded-lg" : "border border-red-500 p-3 mt-5 mb-1 rounded-lg"}
          onClick={onLogin}
          disabled={!loginButton}
        >
          Login
        </button>
        <Link
          className="mt-3"
          href="/signup"
        >
          Don&apos;t have an account?
        </Link>
      </div>
    </div>
  )
}
