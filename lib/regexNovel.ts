import DOMPurify from 'dompurify'
import { REGEX_BOLD_SEPARATIONS, RGX_NUMBERS, RGX_TITLES, RGX_LOCATIONS, RGX_REFERENCES } from '@/contentRegex';

const escapeRegex = (str: string) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

export const applyStylesToPhrases = (content: string) => {
  const styledContent = content.replace(
    new RegExp(REGEX_BOLD_SEPARATIONS.map(escapeRegex).join('|'), 'g'),
    (match) => { 
      if (RGX_NUMBERS.includes(match)) {
         return `<p class="font-bold text-lg py-4 pl-2 text-left">${match}</p>`;
      } else if (RGX_TITLES.includes(match)) {
         return `<p class="font-bold text-xl pt-10 pb-4 text-center">${match}</p>`;
      } else if (RGX_LOCATIONS.includes(match)) {
         return `<p class="font-bold text-base pt-6 pb-3 text-center">${match}</p>`;
      } else if (RGX_REFERENCES.includes(match)) {
         return `<p class="font-semibold text-base italic pt-1 pb-2 pl-1 text-left">${match}</p>`;
      } else {
         return `<p class="font-light text-base text-center pt-1 pb-2">${match}</p>`;
      }
    }
  );
  const sanitizedContent = DOMPurify.sanitize(styledContent);

  return sanitizedContent;
};