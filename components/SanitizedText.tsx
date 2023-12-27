import React from 'react'
import { applyStylesToPhrases } from '@/lib/regexNovel'
import { REGEX_BOLD_SEPARATIONS } from '@/contentRegex'

interface SanitizedTextProps {
   paragraph: string;
 }

const SanitizedText: React.FC<SanitizedTextProps> = ({ paragraph }) => {
   return (
      <React.Fragment>
         {REGEX_BOLD_SEPARATIONS.some((regex) => paragraph.includes(regex)) ? (
            <p dangerouslySetInnerHTML={{ __html: applyStylesToPhrases(paragraph) }} />
         ) : (
            <p>{paragraph}</p>
         )}
     </React.Fragment>
   )
}

export default SanitizedText