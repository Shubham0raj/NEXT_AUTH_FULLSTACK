"use client"
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function signuppage() {
  const router = useRouter()
  const [user,setUser]= useState({
    email: "",
    pasword: "" ,
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
    if(user.email.length>0&&user.pasword.length>0 &&user.username.length>0){
      setButtonDisable(false)
    }else{
      setButtonDisable(true)
    }
  },[])
  return (
    <div>signup</div>
  )
}

