"use client"

import React, { useEffect, useState } from 'react'
import  axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {
  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      setButtonDisabled(true)
      const response = await axios.post("/api/users/login", user)
      console.log('Login success: ', response.data)
      router.push('/profile')
      
    } catch (error: any) {
      console.log('Login failed')
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">Email:</label>
      <input type="text"
      id='email'
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white' />

      <label htmlFor="email">Password:</label>
      <input type="text"
      id='password'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white' />

      <button
        onClick={onLogin}
        disabled={buttonDisabled}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:border-gray-600 disabled:text-gray-400'
      >Login</button>

      <Link href='/signup'>Visit signup page</Link>
    </div>
  )
}

export default page
