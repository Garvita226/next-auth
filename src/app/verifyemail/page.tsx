"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const page = () => {
  // const router = useRouter()

  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [verified, setVerified] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', {token})
      setVerified(true)
      setError('')

    } catch (error: any) {
      setError(error.response.data)
    }
  }

  useEffect(() => {
    // const {query} = router
    // const urlToken = String(query.token)

    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  useEffect(() => {
    verifyUserEmail()
  }, [token])

  return (
    <div className='flex flex-col justify-center items-center p-2 min-h-screen'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h2 className='p-2 bg-orange-500 text-black'>{token || "No Token"}</h2>

      { verified && (
        <div>
          <h2>Verified</h2>
          <Link href='/login'>Login</Link>
        </div>
      ) }

      { error && (
        <div>
          <h2>Error</h2>
        </div>
      ) }
    </div>
  )
}

export default page
