import React from 'react'
import { FooterProps } from '@/types'

const FooterSimplified: React.FC<FooterProps> = ({ bgLight = true, borderTop = true, pB = false }) => (
   <footer className={`${bgLight ? "text-gray-600" : "text-gray-300"}`}>
      <div className={`footer-simplified ${!borderTop && "border-none"}`}>
         <p className={`${bgLight ? "text-gray-400" : "text-gray-200"} ${pB ? "pt-2 pb-7" : "pt-2"}`}>
            @2024 Vlads Novels. All rights reserved
         </p>
      </div>
   </footer>
)

export default FooterSimplified