import Image from 'next/image'
import { CustomButtonProps } from '@/types'

const Button = ({ title, btnType, additionalStyles, textStyles, reactIcon, isDisabled, action }: CustomButtonProps) => {
  return (
    <button 
      disabled={isDisabled || false}
      type={btnType || "button"}
      className={`custom-btn ${additionalStyles}`}
      onClick={action}
    >
      {reactIcon && (
         <div className="relative w-6 h-6">
            {reactIcon}
         </div>
      )}
      <span className={`flex-1 ${textStyles}`}>
         {title}
      </span>
    </button>
  )
}

export default Button