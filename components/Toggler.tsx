import axios from 'axios'
import React, { useState } from 'react'
import { TogglerProps } from '@/types'
import { toast } from 'react-hot-toast'

const Toggler: React.FC<TogglerProps> = ({ isSubscribed }) => {
   const [permission, setPermission] = useState(isSubscribed);

   const handleSwitcher = async () => {
      try {
        await axios.patch(`/api/newsletter`, null);
        setPermission((prev) => !prev);
        toast.success('Newsletter preferences registered');
      } catch (error) {
        console.error('Error occurred updating user\'s newsletter preferences', error);
        toast.error('Error please try again later');
        return;
      }
   };

  return (
   <div className="toggler-container">
      <div onClick={handleSwitcher} className={`toggler ${permission ? 'border-green-500' : 'border-red-700'}`}>
         <div className="toggle-choice">{permission ? "+ДА" : ""}</div>
         <div className="toggle-choice">{!permission ? "НЕТ" : ""}</div>
         <div className={`toggle-ball ${permission ? 'right-0.5 bg-green-500' : 'left-0.5 bg-red-700'}`}></div>
      </div>
    </div>
  )
}

export default Toggler