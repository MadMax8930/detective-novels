import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HiSearchCircle } from 'react-icons/hi'

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
   <button type="submit" className={`-ml-10 z-10 ${otherClasses}`}>
      <HiSearchCircle size={36} className="object-contain text-primary-red-100 hover:text-black-100" />
   </button>
);

interface SearchBarProps {
   initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialValue = '' }) => {
   const router = useRouter();
   const [novelName, setNovelName] = useState(initialValue);

   const submitSearchTerm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (novelName === '') {
         return alert('Please fill in the search bar');
      }
      updateSearchParams(novelName.toLowerCase());
   }

   const updateSearchParams = (novelName: string) => {
      const searchParams = new URLSearchParams(window.location.search);

      if (novelName) {
         searchParams.set('novel', novelName)
      } else {
         searchParams.delete('novel')
      }

      const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
      router.push(newPathname);
   }

  return (
    <form className="search-bar" onSubmit={submitSearchTerm}>
      <div className="search-bar__item">
         <input 
            type="text" name="novel"
            value={novelName} onChange={(e) => setNovelName(e.target.value)}
            placeholder="Enter the Novel's name" className="search-bar__input"
         />
         <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar