"use client"
import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function profilePage() {

    const router= useRouter()
    const [data,setData] = useState("nothing")

    const getUserDetails = async()=>{
        try {
            const res = await axios.post("/api/users/me")
            console.log(res.data);
            setData(res.data.data._id)
        } catch (error:any) {
            console.log("DATA CANT BE FETCHED")
            toast.error(error.message)
        }
    }

const logout = async () => {
  try {
    const response = await axios.get("/api/users/logout");

    if (response.status === 200) {
      toast.success("Logged out successfully");

      // Always use replace() so back button doesn't return to protected pages
      router.replace("/login");
    }
  } catch (error:any) {
    console.error("Logout Error:", error);
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>PROFILE PAGE</h1>
        <hr/>

        <h2>{data ==="nothing"? "NOTHING" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
         <hr/>   
        
        <button
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={logout}
        >logout</button>

        <button
        className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        onClick={getUserDetails}
        >GET USER DETAILS</button>
    </div>
  )
}
