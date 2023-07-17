"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "")
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl p-5">Verify Email</h1>
      <h2 
      className={token 
        ? "text-3xl text-orange-500 border border-orange-500 p-2 rounded-lg"
        : "text-3xl text-red-700 border border-red-700 p-2 rounded-lg"
      }
      >
        {token ? `${token}` : "No token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl font-bold">Email Verified</h2>
          <Link className="text-blue-500" href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl font-bold text-red-700">Error!!!</h2>
          <Link className="text-blue-500" href="/login">Login</Link>
        </div>
      )}
    </div>
  )
}