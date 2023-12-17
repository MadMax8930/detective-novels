import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { HiSearchCircle, HiX } from 'react-icons/hi'
import { toast } from 'react-hot-toast'
import useNovel from '@/hooks/useNovel'

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
   <button type="submit" className={`-ml-10 z-10 ${otherClasses}`}>
      <HiSearchCircle size={36} className="object-contain text-primary-black opacity-80 hover:text-black" />
   </button>
);

interface SearchBarProps {
   initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialValue = '' }) => {
   const router = useRouter();
   const { novelId } = router.query;
   const { data: novelData } = useNovel(novelId as string);
   const [searchQuery, setSearchQuery] = useState(initialValue);
   
   const submitSearchTerm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchQuery === '') return toast.error('Please fill in the search bar');
      searchNovelByTitle(searchQuery);
   }

   const searchNovelByTitle = async (title: string) => {
      try {
         const response = await fetch(`/api/novelIdByTitle?query=${encodeURIComponent(title)}`);
         const data = await response.json();

         if (data.id) {
            router.push(`/profile?novel=${data.id}`);
         } else {
            toast.error('Novel not found. Enter the correct title');
         }
      } catch (error) {
         console.error(error);
         toast.error('An error occurred while searching for the novel');
      }
   }

   useEffect(() => {
      if (novelData) {
         setSearchQuery(novelData.title);
      }
   }, [novelData]);

  return (
   <div className="flex flex-row justify-center items-start md:pt-4 pt-1 mb:pt-1 pb-4 bg-primary-light">
      <form className="search-bar" onSubmit={submitSearchTerm}>
         <div className="search-bar__item">
            <input 
               type="text" name="novel"
               value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Enter the Novel's name" className="search-bar__input"
            />
            {searchQuery && (
               <button
                  type="button"
                  className="search-bar__clear"
                  onClick={() => setSearchQuery('')}
               > 
                  <HiX size={24} />
               </button>
            )}
         </div>
         <SearchButton otherClasses="sm:hidden search-bar__submit-mobile" />
         <SearchButton otherClasses="max-sm:hidden" />
      </form>
   </div>
  )
}

export default SearchBar