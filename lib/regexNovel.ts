import DOMPurify from 'dompurify'
import { REGEX_BOLD_SEPARATIONS } from '@/contentRegex'

const escapeRegex = (str: string) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

export const applyStylesToPhrases = (content: string) => {
  const styledContent = content.replace(
    new RegExp(REGEX_BOLD_SEPARATIONS.map(escapeRegex).join('|'), 'g'),
    (match) => `<p class="font-bold text-lg py-4 text-center">${match}</p>`
  );
  const sanitizedContent = DOMPurify.sanitize(styledContent);

  return sanitizedContent;
};