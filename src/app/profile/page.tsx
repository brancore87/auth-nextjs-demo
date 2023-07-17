"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import axios from 'axios'
import logo from '../../../public/hacker.png'
import { toast } from 'react-hot-toast'
import { useState } from 'react'


export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/login")

    } catch (error: any) {
      console.log(error.message);
      toast.error(error)
    }
  }

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/myself")
    console.log(response.data);
    setData(response.data.data._id)

  }

  return (
    <div className="flex flex-col items-center min-h-screen py-2 border border-white ">
      <div className="inline-block px-20 text-center">
        <h1 className="text-4xl font-bold">Profile</h1>
        <button
          onClick={logout}
          className="text-orange-200"
        >
          Logout
        </button>
      </div>
      <Image
        src={logo}
        alt="logo"
        width={100}
        height={100}
        className="m-5 border border-teal-600 rounded-md hover:rounded-full hover:animate-pulse"
      />
      <h2
        className="text-4xl text-red-400"
      >
        {data === "" 
        ? "Nothing" 
        : <Link href={`/profile/${data}`}>
          {data}
          </Link>
        }
      </h2>
      <p className="text-center p-3 m-3">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis, vero. Possimus eum provident natus cumque id sunt, adipisci sint iure quia nobis, sed, nemo voluptatibus. Dignissimos sapiente libero illum cumque!
      </p>
      <button
        onClick={getUserDetails}
        className="p-3 font-bold border hover:border-teal-700 hover:text-white border-white text-teal-500 rounded-lg"
      >
        Get data
      </button>

    </div>
  )
}
