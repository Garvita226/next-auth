import React from 'react'

const page = ({params}: any) => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
      <h1>Profile page</h1>
      <div className='bg-green-500 mt-4 text-black font-bold py-2 px-4 rounded-lg'>{params.id}</div>
    </div>
  )
}

export default page
