import Image from 'next/image'
import { CustomButtonProps } from '@/types'

const Button = ({ title, btnType, additionalStyles, textStyles, leftIcon, rightIcon, isDisabled, action }: CustomButtonProps) => {
  return (
    <button 
      disabled={isDisabled || false}
      type={btnType || "button"}
      className={`custom-btn ${additionalStyles}`}
      onClick={action}
    >
      {leftIcon && (
         <div className="relative w-6 h-6">
            {leftIcon}
         </div>
      )}
      <span className={`flex-1 ${textStyles}`}>
         {title}
      </span>
      {rightIcon && (
         <div className="relative w-6 h-6">
            {rightIcon}
         </div>
      )}
    </button>
  )
}

export default Button