import React, { useState, useCallback } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { InputProps } from '@/types'

const Input: React.FC<InputProps> = ({ id, onChange, value, label, name, type, minLength, adminPage }) => {
   const [visiblePassword, setVisiblePassword] = useState(false);
   const [showTooltip, setShowTooltip] = useState(false);

   const showPassword = useCallback(() => {
      setVisiblePassword((currentState: boolean) => !currentState)
   }, []);

   const inputType = visiblePassword ? 'text' : type || 'text';

   return (
      <div className="relative">
         <input
            onChange={onChange}
            type={inputType} // text or password
            value={value}
            name={name}
            id={id}
            className={`
               block
               rounded-md
               px-6
               pt-6
               pb-1
               w-full
               text-base
               text-white
               ${adminPage ? 'bg-admin-third' : 'bg-neutral-700'}
               appearance-none
               focus:outline-none
               focus:ring-0
               peer
            `}
            placeholder=" "
            minLength={minLength}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
         />
         {type === 'password' && (
         <>
            <button
               type="button"
               onClick={showPassword}
               className="
                  absolute
                  top-4
                  right-6
                  z-10
                  text-zinc-400
                  cursor-pointer
               "
            >
               {visiblePassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
            {showTooltip && minLength && (
               <div className="tooltip">{`We recommend at least ${minLength} characters`}</div>
            )}
         </>
         )}
         <label 
            className="
               absolute
               text-base
               text-zinc-400
               duration-150
               transform
               -translate-y-3
               scale-75
               top-4
               z-10
               origin-[0]
               left-6
               peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0
               peer-focus:scale-75
               peer-focus:-translate-y-3
            "
            htmlFor={id}
         >
            {label}
         </label>
      </div>
   )
}

export default Input