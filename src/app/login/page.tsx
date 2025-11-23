"use client"
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function loginpage() {
  const router = useRouter()
  const [user,setUser]= useState({
    email: "",
    password: "" 
  })

  const [buttonDisable,setButtonDisable]= useState(false)
  const [loading,setLoading] = useState(false)

  const onLogin = async()=> {
    try {
      setLoading(true)
       const response = await axios.post("/api/users/login",user)
       console.log("Login success",response.data);
       router.push('/profile')
    } catch (error :any) {
      console.log("Login failed")
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  },[user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "processing": "signup"}</h1>
      <hr/>
      <label htmlFor="email">email</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 bg-white focus:outline-none focus:border-gray-600 text-black" value={user.email} id='email' onChange={(e)=>setUser({...user,email:e.target.value })} placeholder='abc@gmail.com' type='email'/>
    
      <label htmlFor='password'>password</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 bg-white focus:outline-none focus:border-gray-600 text-black"value={user.password} placeholder='password' id='password' type='password' onChange={(e)=>setUser({...user,password:e.target.value})}/>

      {!buttonDisable && (
        <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >LOGIN
      </button>
      )}
      <Link href={"/signup"}>visit sign-up page</Link>
    </div>
  )
}

