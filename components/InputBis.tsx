import React from 'react'
import { InputBisProps } from '@/types'

const InputBis: React.FC<InputBisProps> = ({ id, onChange, value, label, name, placeholderQuote, hasQuote, rows }) => {
   return (
      <div className="relative">
         <textarea
            onChange={onChange}
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
               bg-admin-third
               appearance-none
               focus:outline-none
               focus:ring-0
               peer
               admin-textarea
               ${placeholderQuote && hasQuote ? 'text-center italic' : ''}
            `}
            placeholder={placeholderQuote ? `${placeholderQuote}` : " "}
            rows={rows}
         />
         <label 
            className={`
               absolute
               text-base
               text-zinc-400
               duration-150
               transform
               -translate-y-3
               scale-75
               lg:top-[6.6px] md:top-[7.07px] top-[6.9px]
               py-2
               z-10
               origin-[0]
               left-6
               peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0
               peer-focus:scale-75
               peer-focus:-translate-y-3
               ${value && 'bg-admin-third right-0 xl:w-[126.5%] lg:w-[124%] w-[122.5%]'}
            `}
            htmlFor={id}
         >
            {label}
         </label>
      </div>
   )
}

export default InputBis