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
      <div className="min-h-[460px] flex flex-grow justify-center items-center">
         <ClipLoader color="white" size={100} />
      </div>
  )
}

const AdminError = () => {
   return (
      <div className="min-h-[20px]">
         <p className="text-center text-white">Error loading admin data.</p>
      </div>
  )
}

export { Loader, AdminLoader, AdminError }