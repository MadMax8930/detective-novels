import React from 'react'
import { FooterProps } from '@/types'

const FooterSimplified: React.FC<FooterProps> = ({ bgLight = true, borderTop = true }) => (
   <footer className={`${bgLight ? "text-gray-600" : "text-gray-300"}`}>
      <div className={`footer-simplified ${!borderTop && "border-none"}`}>
         <p className={`${bgLight ? "text-gray-400" : "text-gray-200"} pt-2`}>
            @2023 Vlads Novels. All rights reserved
         </p>
      </div>
   </footer>
)

export default FooterSimplified