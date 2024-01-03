export function format(dateString: string, locale: string = 'ru-RU'): string {
   const options: Intl.DateTimeFormatOptions = {
     day: 'numeric',
     month: 'long',
     year: 'numeric',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
     timeZoneName: 'short'
   };

   if (locale === 'en-EN') { 
      options.month = 'short';
      options.hour12 = false;
      delete options.year;
   }
 
   const date = new Date(dateString);
   const formattedDate = date.toLocaleString(locale, options);

   return formattedDate.replace(/(GMT\+\d+)/, '');
};