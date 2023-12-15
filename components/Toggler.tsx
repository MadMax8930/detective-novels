import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export interface TogglerProps {
   permission: boolean;
   mutateUser: () => void; 
}

const Toggler: React.FC<TogglerProps> = ({ permission, mutateUser }) => {

   const handleSwitcher = async () => {
      try {
        await axios.patch(`/api/newsletter`, null);
        mutateUser();
        toast.success('Newsletter preferences successfully registered');
      } catch (error) {
        console.error('Error occurred updating user\'s newsletter preferences', error);
        toast.error('Error please try again later');
        return;
      }
   };

  return (
    <div className="toggler" onClick={handleSwitcher}
         style={permission ? { borderColor: "#53c28b" } : { borderColor: "#c72c2c" }}>
      <div className="toggle-choice">{permission ? "+ON" : ""}</div>
      <div className="toggle-choice">{!permission ? "OFF" : ""}</div>
      <div className="toggle-ball" 
           style={permission ? { right: "2px", backgroundColor: "#53c28b" } : { left: "2px", backgroundColor: "#c72c2c" }}>
      </div>
    </div>
  )
}

export default Toggler