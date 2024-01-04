import { WORDS_PER_PAGE } from '@/constants'
import { WordCutOffProps } from '@/types'

export const formatPageContent = ({currentPage, data }: WordCutOffProps) => {
   let startIndex = (currentPage - 1) * WORDS_PER_PAGE;
   let endIndex = startIndex + WORDS_PER_PAGE;
 
   const lastWordIndex = data?.content?.lastIndexOf(/[\s.,\p{P}]/u, endIndex) || 0;
   if (lastWordIndex >= startIndex) {
     endIndex = lastWordIndex;
     startIndex = data?.content?.search(/[^\s,.\p{P}]/u, startIndex) || 0;
   }
 
   while (endIndex < data?.content?.length && !/[.,]/u.test(data.content[endIndex - 1])) {
     endIndex++;
   }
 
   if (currentPage > 1) {
     let match;
     while (endIndex < data?.content?.length) {
       match = data.content.substring(startIndex).match(/^[^.,]*[.,]/u);
       if (match) {
         const matchedText = match[0];
         startIndex += matchedText.length;
         break;
       }
       endIndex++;
     }
   }
 
   if (currentPage === Math.ceil(data?.content?.length / WORDS_PER_PAGE)) {
     const match = data.content?.substring(startIndex).match(/^[^.,]*[.,]/u);
     if (match) {
       const matchedText = match[0];
       startIndex += matchedText.length;
     }
   }
 
   const currentPageContent = (data?.content || []).slice(startIndex, endIndex);
 
   return { startIndex, endIndex, currentPageContent };
};
 