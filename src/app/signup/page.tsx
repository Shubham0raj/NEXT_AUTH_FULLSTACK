"use client"
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function signuppage() {
  const router = useRouter()
  const [user,setUser]= useState({
    email: "",
    password: "" ,
    username : ""
  })

  const [buttonDisable,setButtonDisable]= useState(false)
  const [loading,setLoading] = useState(false)

  const onSignup = async()=> {
    try {
      setLoading(true)
       const response = await axios.post("/api/users/signup",user)
       console.log("Signup success",response.data);
       router.push('/login')
    } catch (error :any) {
      console.log("Signup failed")
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length>0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  },[user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "processing": "signup"}</h1>
      <hr/>
      <label htmlFor="username">username</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 bg-white focus:outline-none focus:border-gray-600 text-black" id ="username" value= {user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder = "username" type = "text"/>

      <label htmlFor="email">email</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 bg-white focus:outline-none focus:border-gray-600 text-black" value={user.email} id='email' onChange={(e)=>setUser({...user,email:e.target.value })} placeholder='abc@gmail.com' type='email'/>
    
      <label htmlFor='password'>password</label>
      <input className="p-2 border border-gray-300 rounded-lg mb-4 bg-white focus:outline-none focus:border-gray-600 text-black"value={user.password} placeholder='password' id='password' type='password' onChange={(e)=>setUser({...user,password:e.target.value})}/>

      {!buttonDisable && (
        <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >SIGN UP
      </button>
      )}
      
      <Link href={"/login"}>visit login page</Link>
    </div>
  )
}

