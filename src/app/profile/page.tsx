"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {toast} from 'react-hot-toast'

const page = () => {
  const [data, setData] = useState('')
  const router = useRouter()

  const getData = async () => {
    try {
      const response = await axios.post('/api/users/me')
      console.log(response.data.data)
      setData(response.data.data._id)
      
    } catch (error: any) {
      console.log(error.response)
      toast.error(error.response.statusText)
    }
  }

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout success')
      router.push('/login')
      
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>{!data ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button onClick={getData} className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'>Get user details</button>
      <button onClick={logout} className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>Logout</button>
    </div>
  )
}

export default page 
