import Image from 'next/image'
import { CustomButtonProps } from '@/types'

const Button = ({ title, btnType, additionalStyles, textStyles, rightIcon, isDisabled, action }: CustomButtonProps) => {
  return (
    <button 
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${additionalStyles}`}
      onClick={action}
    >
      <span className={`flex-1 ${textStyles}`}>
         {title}
      </span>
      {rightIcon && (
         <div className="relative w-6 h-6">
            <Image src={rightIcon} alt="right icon" fill className="object-contain" />
         </div>
      )}
    </button>
  )
}

export default Button