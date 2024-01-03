import DOMPurify from 'dompurify'
import { REGEX_BOLD_SEPARATIONS, RGX_NUMBERS, RGX_TITLES, RGX_LOCATIONS, RGX_REFERENCES, RGX_THEEND, RGX_OTHERS } from '@/contentRegex';

const escapeRegex = (str: string) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
const HTML_SPACES_INDENTATION = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

export const applyStylesToPhrases = (content: string) => {
  const styledContent = content.replace(
    new RegExp(REGEX_BOLD_SEPARATIONS.map(escapeRegex).join('|'), 'g'),
    (match) => {

      if (RGX_NUMBERS.includes(match)) {
         return `<p class="font-bold md:text-lg text-base md:py-4 py-3 pl-2 text-left">${match}</p>`;
      } else if (RGX_TITLES.includes(match)) {
         return `<p class="font-bold md:text-xl text-sm md:pt-10 pt-4 md:pb-4 pb-2 text-center">${match}</p>`;
      } else if (RGX_LOCATIONS.includes(match) || /^\[.*?\]$/.test(match)) {
         return `<p class="font-bold md:text-base text-xs mt:pt-6 pt-4 pb-3 text-center">${match}</p>`;
      } else if (RGX_REFERENCES.includes(match)) {
         return `<p class="font-semibold md:text-base text-xs italic pb-1 pl-1 text-left">${match}</p>`;
      } else if (RGX_THEEND.includes(match)) {
         return `<p class="font-bold md:text-xl text-sm md:pt-12 pt-10 md:pb-12 pb-6 text-center">${match}</p>`;
      } else if (RGX_OTHERS.includes(match)) {
         return `<p class="font-light md:text-base text-sm text-center pt-1 pb-2">${match}</p>`;
      } else {
         return `${HTML_SPACES_INDENTATION}${match}`;
      }
    }
  );
  const sanitizedContent = DOMPurify.sanitize(styledContent);

  return sanitizedContent;
};