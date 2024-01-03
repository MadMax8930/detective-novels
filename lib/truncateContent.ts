export const truncate = (text: string, maxChars: number) => {
   if (text.length <= maxChars) {
     return text;
   } else {
     return text.substring(0, maxChars) + '...';
   }
};