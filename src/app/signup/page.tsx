"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  })
  const [signupButton, setSignupButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup successful", response.data);
      router.push("/login")


    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message)


    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 5 && user.username.length > 0) {
      setSignupButton(true);
    } else {
      setSignupButton(false);
    }
  }, [user])

  return (

    <div className="flex flex-col items-center justify-center text-center min-h-screen py-2">
      <div className="flex flex-col px-6 py-5 rounded-xl border border-white">
        <h1 className="text-4xl font-bold m-5">{loading ? "Processing..." : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input
          className="text-black text-center rounded-md mt-5 p-2"
          id="username"
          type="text"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
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
          // className="border border-gray-300 p-3 m-5 rounded-lg"
          className={signupButton ? "border border-green-500 p-3 m-5 rounded-lg" : "border border-red-500 p-3 m-5 rounded-lg"}
          onClick={onSignup}
          disabled={!signupButton}
        >
          Signup
        </button>
        <Link
          href="/login"
          className="text-teal-500"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  )
}
