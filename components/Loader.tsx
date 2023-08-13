import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
   return (
      <div className="flex justify-center items-center h-full min-h-screen">
         <ClipLoader color="red" size={100} />
      </div>
  )
}

export default Loader