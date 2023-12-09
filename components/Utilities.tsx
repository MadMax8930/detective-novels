import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
   return (
      <div className="flex justify-center items-center h-full min-h-screen">
         <ClipLoader color="red" size={100} />
      </div>
  )
}

const AdminLoader = () => {
   return (
      <div className="flex justify-center items-center h-full my-40">
         <ClipLoader color="white" size={100} />
      </div>
  )
}

const AdminError = () => {
   return (
      <p className="text-center text-white">Error loading admin data.</p>
  )
}

export { Loader, AdminLoader, AdminError }