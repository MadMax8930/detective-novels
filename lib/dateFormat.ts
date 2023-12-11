export function format(dateString: string): string {
   const options: Intl.DateTimeFormatOptions = {
     day: 'numeric',
     month: 'long',
     year: 'numeric',
     hour: '2-digit',
     minute: '2-digit',
     second: '2-digit',
     timeZoneName: 'short'
   };
 
   const date = new Date(dateString);
   return date.toLocaleString('ru-RU', options);
}