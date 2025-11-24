"use client"
import React from "react"
import { useParams } from "next/navigation"



export default function UserProfile({params}:any){
    params = useParams();
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>PROFILE PAGE</h1>
            
            <h2 className="p-3 bg-green-500 rounded text-black">{params.id}</h2>
        </div>
    )
}