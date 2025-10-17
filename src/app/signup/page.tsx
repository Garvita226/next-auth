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
    password: "",
    username: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      setButtonDisabled(true)
      const response = await axios.post("/api/users/signup", user)
      console.log('Signup success: ', response.data)
      router.push('/login')
      
    } catch (error: any) {
      console.log('Signup failed')
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username:</label>
      <input type="text"
      id='username'
      value={user.username}
      onChange={(e) => setUser({...user, username: e.target.value})}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white' />

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
        onClick={onSignup}
        disabled={buttonDisabled}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:border-gray-600 disabled:text-gray-400'
      >Sign up</button>

      <Link href='/login'>Visit login page</Link>
    </div>
  )
}

export default page
