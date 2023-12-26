export const FOOTER_LINKS = [
   {
      title: "About",
      links: [
         { title: "Events", url: "/" },
         { title: "Featured", url: "/" },
         { title: "Relations", url: "/" },
      ],
   },
   {
      title: "Company",
      links: [
         { title: "Events", url: "/" },
         { title: "Blog", url: "/" },
         { title: "Podcast", url: "/" },
      ],
   },
   {
      title: "Socials",
      links: [
         { title: "LinkedIn", url: "/" },
         { title: "Twitter", url: "/" },
         { title: "Facebook", url: "/" },
      ],
   },
];

export const DEFAULT_COVER = 'https://edit.org/images/cat/book-covers-big-2019101610.jpg';
export const LINKEDIN = 'https://www.linkedin.com/in/vladislav-surnin-89a51b5';

export const COFFEE_URL = `https://www.buymeacoffee.com/${process.env.NEXT_PUBLIC_BUYMEACOFFEE_USERNAME}`;
export const PAYPAL_URL = `https://www.paypal.com/donate?business=${process.env.NEXT_PUBLIC_PAYPAL_MERCHANT_ID}`;

export const ITEMS_PER_PAGE = 4;

export const WORDS_PER_PAGE = 2500;

export const BOOK_MAX_CHARS = 310;

export const HARDCODED_CHART_DATA = [
   {
      day: "Sun",
      visit: 2,
      comment: 9,
      favorite: 0,
   },
   {
      day: "Mon",
      visit: 5,
      comment: 2,
      favorite: 1,
   },
   {
      day: "Tue",
      visit: 7,
      comment: 3,
      favorite: 2,
   },
   {
      day: "Wed",
      visit: 22,
      comment: 7,
      favorite: 3,
   },
   {
      day: "Thu",
      visit: 12,
      comment: 5,
      favorite: 1,
   },
   {
      day: "Fri",
      visit: 10,
      comment: 10,
      favorite: 2,
   },
   {
      day: "Sat",
      visit: 30,
      comment: 20,
      favorite: 4,
   },
];
